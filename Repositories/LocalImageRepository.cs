using SkillLink.Data;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public class LocalImageRepository : IImageRepostiriy
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly SkillLinkDbContext dbContext;

        public LocalImageRepository(IWebHostEnvironment webHostEnvironment,IHttpContextAccessor httpContextAccessor, 
                                  SkillLinkDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }
        public async Task<Image> Upload(Image image )
        {
            //creatin path to upload folder
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "ImageUploads",
                               $"{image.FileName}");
            //{ image.FileExtention}

            //upload to local folder
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.File.CopyToAsync(stream);

            // https://localhost:1234/ImageUploads/image.jpg
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/ImageUploads/{image.FileName}"; //{image.FileExtention}

            image.FilePath = urlFilePath;
            //add image to database
            await dbContext.Images.AddAsync(image);
            await dbContext.SaveChangesAsync();

            return image;
        }
    }
}
