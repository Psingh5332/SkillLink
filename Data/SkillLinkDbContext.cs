using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Data
{
    public class SkillLinkDbContext : IdentityDbContext<ApplicationUser>
    {
        public SkillLinkDbContext(DbContextOptions<SkillLinkDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userRoleId = "cda8ec06-af61-4627-8c82-3b3de4ac1ae0";
            var adminRoleId = "5c83c52e-9426-46a3-b5b2-a6a591ca39f1";
            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id=userRoleId,
                    ConcurrencyStamp=userRoleId,
                    Name="User",
                    NormalizedName="User".ToUpper()

                },
                 new IdentityRole
                {
                    Id=adminRoleId,
                    ConcurrencyStamp=adminRoleId,
                    Name="Admin",
                    NormalizedName="Admin".ToUpper()

                }

            };
            //seeding in builder object
            builder.Entity<IdentityRole>().HasData(roles);
        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Skills> Skills { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<UserSkills> UserSkill { get; set; }
        public DbSet<Article> Articles { get; set; }


    }
}
