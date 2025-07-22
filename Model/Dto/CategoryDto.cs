using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
