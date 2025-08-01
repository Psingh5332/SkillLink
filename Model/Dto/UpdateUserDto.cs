using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class UpdateUserDto
    {
        //public string UserId { get; set; }           // IdentityUser Id
        //[Required]
        //public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
