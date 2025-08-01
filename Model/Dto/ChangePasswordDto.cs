using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class ChangePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
