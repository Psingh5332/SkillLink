using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface IUserSkillRepository
    {
        Task<List<UserSkills>> GetAllAsync();
        Task<UserSkills?> GetByIdAsync(Guid id);
        Task<UserSkills?> CreateAsync(UserSkills userSkill);
        Task<UserSkills?> UpdateAsync(Guid id, UserSkills userSkill);
        Task<UserSkills?> DeleteAsync(Guid id);
        Task<bool> isSkillExist(string Name);
        Task<List<UserSkills>> GetSkillsByUser(string userId);
    }
}
