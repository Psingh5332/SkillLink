using Microsoft.AspNetCore.Identity;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface ITokenRepostitory
    {
      string  CreateJWTToken(ApplicationUser user, List<string> role);
    }
}
