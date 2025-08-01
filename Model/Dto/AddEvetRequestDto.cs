using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class AddEvetRequestDto
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
        public string? Type { get; set; }
        public Guid UserId { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        public bool isPublic { get; set; }

        //   public List<Category> categories { get; set; }
    }
}
