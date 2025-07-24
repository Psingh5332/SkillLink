using Microsoft.EntityFrameworkCore;
using SkillLink.Data;
using SkillLink.Mappings;
using SkillLink.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using SkillLink.Model.Domain;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("https://unrivaled-cocada-ea13b2.netlify.app/")
                          .AllowAnyHeader()
                          .AllowAnyMethod());

});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "SkillLink API", Version = "v1" });
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type=SecuritySchemeType.ApiKey,
        Scheme=JwtBearerDefaults.AuthenticationScheme,

    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
        new OpenApiSecurityScheme
        {
          Reference=new OpenApiReference
          {
              Type=ReferenceType.SecurityScheme,
              Id=JwtBearerDefaults.AuthenticationScheme
          },
          Scheme="Oauth2",
          Name=JwtBearerDefaults.AuthenticationScheme,
          In=ParameterLocation.Header,
        },
        new List<string>()
        }

    });
});

//Add  dbcontext for sql server database
builder.Services.AddDbContext<SkillLinkDbContext>(option =>
                option.UseSqlServer(builder.Configuration.GetConnectionString("SkillLinkConnectionString")));

//add identity database 
builder.Services.AddDbContext<SkillLinkIdentityDbContext>(option =>
                option.UseSqlServer(builder.Configuration.GetConnectionString("SkillLinkAuthConnectionString")));


// adding repostiroy

builder.Services.AddScoped<ICategory,CategoryRepository>();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddScoped<ITokenRepostitory, TokenRepository>();
builder.Services.AddScoped<IImageRepostiriy, LocalImageRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IUserSkillRepository, UserSkillRepository>();


//adding automapper services 
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));


//adding identity 
builder.Services.AddIdentityCore<ApplicationUser>()
       .AddRoles<IdentityRole>()
       .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("SkillLink")
       .AddEntityFrameworkStores<SkillLinkIdentityDbContext>()
       .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options => {
    options.Password.RequireDigit = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 4;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequireLowercase = false;

});

    
     

//adding authenticaion method

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime=true,
            ValidateIssuerSigningKey=true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey=new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        });


var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
     FileProvider=new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),"ImageUploads")),
     RequestPath="/ImageUploads"
});
app.MapControllers();

app.Run();
