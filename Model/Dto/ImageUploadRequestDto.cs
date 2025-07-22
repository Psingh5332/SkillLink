using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class ImageUploadRequestDto
    {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string FileName { get; set; }    

        public  string? FileDescription { get; set; }
    }
}
