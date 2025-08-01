using Microsoft.AspNetCore.Identity;

namespace SkillLink.Model.Domain
{
    public class ApplicationUser :IdentityUser
    {
        
        public string FullName { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
