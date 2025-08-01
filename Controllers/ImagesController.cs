using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepostiriy imageRepository;

        public ImagesController(IImageRepostiriy imageRepository)
        {
            this.imageRepository = imageRepository;
        }



        //Post :api/Images/Upload

        [HttpPost]
        [Authorize]
        [Route("Upload")]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto requestDto)
        {
            ValidateFileUpload(requestDto);
            if(ModelState.IsValid)
            {
                //Upload Image
                //convert DTO to Domain Model
                var imageDomainModel = new Image
                {
                    File = requestDto.File,
                    FileExtention = Path.GetExtension(requestDto.File.FileName),
                    FileName = requestDto.FileName,
                    FileSizeInBytes=requestDto.File.Length,
                    Description=requestDto.FileDescription,

                };

                //User repository to upload Image
                await imageRepository.Upload(imageDomainModel);
                return Ok(imageDomainModel);
            }
            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(ImageUploadRequestDto request)
        {
            var allowedExtension = new string[] { ".jpg", ".jpeg", ".png" };
            if(allowedExtension.Contains(Path.GetExtension(request.File.FileName))==false)
            {
                ModelState.AddModelError("file", "Unsupporated file extension");
            }

            //file size more than 10bytes
            if(request.File.Length>10485760)
            {
                ModelState.AddModelError("file", "File size is more than 10bytes, upload smaller file");
            }


        }
    }
}
