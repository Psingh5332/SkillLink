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

            // var cloudName = config["CloudinarySettings:CloudName"];
            // var apiKey = config["CloudinarySettings:ApiKey"];
            // var apiSecret = config["CloudinarySettings:ApiSecret"];

            // Console.WriteLine("===== Cloudinary Config on Render =====");
            // Console.WriteLine("CloudName: " + cloudName);
            // Console.WriteLine("ApiKey: " + apiKey);
            // Console.WriteLine("ApiSecret: " + (string.IsNullOrEmpty(apiSecret) ? "NOT SET" : "SET"));
            // Console.WriteLine("=======================================");
        
            // account = new Account(cloudName, apiKey, apiSecret);
        }
       

       public async Task<string> UploadAsync(IFormFile file)
        {
            // var client = new Cloudinary(account);
            // var uploadParams = new ImageUploadParams()
            // {
            //     File = new FileDescription(file.FileName, file.OpenReadStream()),
            //     Folder = "skilllink_uploads"  // Optional folder in Cloudinary
            // };
            // var uploadResult = await client.UploadAsync(uploadParams);

            // if (uploadResult!=null && uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            // {
            //     return uploadResult.SecureUrl.ToString();
            // }

            // return null;

             try
                {
                    var client = new Cloudinary(account);
            
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, file.OpenReadStream()),
                        Folder = "skilllink_uploads"
                    };
            
                    var uploadResult = await client.UploadAsync(uploadParams);
            
                    if (uploadResult != null && uploadResult.StatusCode == HttpStatusCode.OK)
                    {
                        Console.WriteLine("Upload successful. URL: " + uploadResult.SecureUrl);
                        return uploadResult.SecureUrl.ToString();
                    }
            
                    Console.WriteLine("Upload failed. StatusCode: " + uploadResult?.StatusCode);
                    Console.WriteLine("Error: " + uploadResult?.Error?.Message);
            
                    return null;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Exception during Cloudinary upload: " + ex.Message);
                    Console.WriteLine("StackTrace: " + ex.StackTrace);
                    return null;
                }
             }
         }
}




