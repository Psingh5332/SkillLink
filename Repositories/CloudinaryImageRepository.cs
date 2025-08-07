// ﻿using AutoMapper.Configuration.Annotations;
// using CloudinaryDotNet;
// using CloudinaryDotNet.Actions;
// using SkillLink.Model.Domain;


using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;

namespace SkillLink.Repositories
{
    public class CloudinaryImageRepository : ICloudImageRepository
    {
        private readonly IConfiguration _config;
        private readonly Account _account;

        public CloudinaryImageRepository(IConfiguration config)
        {
            _config = config;

            var cloudName = _config["CloudinarySettings:CloudName"];
            var apiKey = _config["CloudinarySettings:ApiKey"];
            var apiSecret = _config["CloudinarySettings:ApiSecret"];

            if (string.IsNullOrEmpty(cloudName) || string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
            {
                throw new Exception("Cloudinary credentials are missing. Check your configuration.");
            }

            _account = new Account(cloudName, apiKey, apiSecret);
        }

        public async Task<string> UploadAsync(IFormFile file)
        {
            try
            {
                var client = new Cloudinary(_account);
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    Folder = "skilllink_uploads"
                };

                var uploadResult = await client.UploadAsync(uploadParams);

                if (uploadResult != null && uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return uploadResult.SecureUrl.ToString();
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Cloudinary upload failed: " + ex.Message);
                throw;
            }
        }
    }
}










// namespace SkillLink.Repositories
// {
//     public class CloudinaryImageRepository : ICloudImageRepository
//     {
//         private readonly IConfiguration config;
//         private readonly Account account;

//         public CloudinaryImageRepository(IConfiguration config)
//         {
//             this.config = config;
//             account = new Account(config.GetSection("CloudinarySettings")["CloudName"],
//                 config.GetSection("CloudinarySettings")["ApiKey"],
//                 config.GetSection("CloudinarySettings")["ApiSecret"]
//                 );

         
        
//         }
       
//        public async Task<string> UploadAsync(IFormFile file)
//         {
//             var client = new Cloudinary(account);
//             var uploadParams = new ImageUploadParams()
//             {
//                 File = new FileDescription(file.FileName, file.OpenReadStream()),
//                 Folder = "skilllink_uploads"  // Optional folder in Cloudinary
//             };
//             var uploadResult = await client.UploadAsync(uploadParams);

//             if (uploadResult!=null && uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
//             {
//                 return uploadResult.SecureUrl.ToString();
//             }

//             return null;

//          }
//       }
// }










