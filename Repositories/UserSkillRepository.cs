using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Data;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public class UserSkillRepository : IUserSkillRepository
    {
        private readonly SkillLinkDbContext dbContext;

        public UserSkillRepository(SkillLinkDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<UserSkills?> CreateAsync(UserSkills userSkill)
        {
            await dbContext.UserSkill.AddAsync(userSkill);
            await dbContext.SaveChangesAsync();

            return userSkill;
        }

        public async Task<UserSkills?> DeleteAsync(Guid id)
        {
            UserSkills? existingUserSkill = await dbContext.UserSkill.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUserSkill == null)
            {
                return null;
            }
            dbContext.Remove(existingUserSkill);
            await dbContext.SaveChangesAsync();
            return existingUserSkill;
        }

        public  async Task<List<UserSkills>> GetAllAsync()
        {
            return await dbContext.UserSkill.Include(x=>x.User).Include(c=>c.category).ToListAsync();
        }

        public async Task<UserSkills?> GetByIdAsync(Guid id)
        {
            return await dbContext.UserSkill.Include(x=>x.User).Include(c=>c.category).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<UserSkills>> GetSkillsByUser(string userId)
        {
            return await dbContext.UserSkill.Include(x => x.category).Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<bool> isSkillExist(string Name)
        {
            UserSkills? existingSkill = await dbContext.UserSkill.FirstOrDefaultAsync(x => x.Name == Name);

            if (existingSkill == null)
            {
                return false;
            }
            return true;
        }

        public async Task<UserSkills?> UpdateAsync(Guid id, UserSkills userSkill)
        {
            var existingSkill = await dbContext.UserSkill.FirstOrDefaultAsync(x => x.Id == userSkill.Id);
            if (existingSkill == null)
            {
                return null;
            }

            existingSkill.CategoryId = userSkill.CategoryId;
            existingSkill.Name = userSkill.Name;
            existingSkill.Description = userSkill.Description;
            existingSkill.Rating = userSkill.Rating;
            existingSkill.ThumbnailUrl = userSkill.ThumbnailUrl;
            
            await dbContext.SaveChangesAsync();
            return existingSkill;
        }
    }
}
