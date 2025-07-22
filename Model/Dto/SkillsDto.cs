using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class SkillsDto
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
