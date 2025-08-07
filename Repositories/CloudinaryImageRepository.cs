using AutoMapper.Configuration.Annotations;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public class CloudinaryImageRepository : ICloudImageRepository
    {
        private readonly IConfiguration config;
        private readonly Account account;

        public CloudinaryImageRepository(IConfiguration config)
        {
            this.config = config;
            account = new Account(config.GetSection("CloudinarySettings")["CloudName"],
                config.GetSection("CloudinarySettings")["ApiKey"],
                config.GetSection("CloudinarySettings")["ApiSecret"]
                );
        
        }
       
       public async Task<string> UploadAsync(IFormFile file)
        {
            var client = new Cloudinary(account);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                Folder = "skilllink_uploads"  // Optional folder in Cloudinary
            };
            var uploadResult = await client.UploadAsync(uploadParams);

            if (uploadResult!=null && uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.ToString();
            }

            return null;

         }
      }
}







