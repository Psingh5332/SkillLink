using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class RegisterRequestDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Phone { get; set; }
        //public Guid RoleId { get; set; }
    }
}
