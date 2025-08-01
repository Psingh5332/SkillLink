using SkilLink.Model.Domain;
using SkillLink.Model.Domain;
using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class AddEventRequestDto
    {
       
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string Created { get; set; } 
        [Required]
        public string Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string? Type { get; set; }
        public Guid UserId { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        public bool isPublic { get; set; }

     //   public List<Category> categories { get; set; }
        
       
        
    }
}
