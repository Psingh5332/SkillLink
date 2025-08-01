using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Data;

namespace SkillLink.Repositories
{
    public class SkillRepository : ISkillRepository
    {

        private readonly SkillLinkDbContext dbContext;

        public SkillRepository(SkillLinkDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Skills> CreateAsync(Skills skill)
        {
            await dbContext.Skills.AddAsync(skill);
            await dbContext.SaveChangesAsync();
            return skill;
        }

        public async Task<Skills?> DeleteAsync(Guid id)
        {
            Skills existingSkill=dbContext.Skills.FirstOrDefault(x => x.Id == id);
            if (existingSkill == null)
            {
                return null;
            }
            dbContext.Remove(existingSkill);
            await dbContext.SaveChangesAsync();
            return existingSkill;
        }

        public  async Task<List<Skills>> GetAllAsync(string? filterOn,string? filterQuery,
                                          string? sortBy,bool isAscending=true,
                                          int pageNumber=1,int pageSize=5)
        {
            var skills = dbContext.Skills.AsQueryable();

            //filtering
            if(string.IsNullOrWhiteSpace(filterOn)==false && string.IsNullOrWhiteSpace(filterQuery)==false)
            {
                if(filterOn.Equals("Name",StringComparison.OrdinalIgnoreCase))
                {
                    skills = skills.Where(x => x.Name.Contains(filterQuery));
                }
            }
            //sorting 
            if(string.IsNullOrWhiteSpace(sortBy)==false)
            {
                if(sortBy.Equals("Name",StringComparison.OrdinalIgnoreCase))
                {
                    skills = isAscending ? skills.OrderBy(x => x.Name) : skills.OrderByDescending(x=>x.Name);
                }

                // else if for more if need soring on more column 
            }
            //pagination 
            var skipResults = (pageNumber - 1) * pageSize;

            return await skills.Skip(skipResults).Take(pageSize).ToListAsync();
        }

        public async Task<Skills?> GetByIdAsync(Guid id)
        {
            return await dbContext.Skills.FirstOrDefaultAsync(x=>x.Id== id);
            
        }

        public async Task<Skills?> GetByNameAsync(string name)
        {
            return await dbContext.Skills.FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<Skills?> UpdateAsync(Guid id, Skills skill)
        {
            var existingSkill= await dbContext.Skills.FirstOrDefaultAsync(x => x.Id == id);
            if (existingSkill == null)
            {
                return null;
            }
            existingSkill.Id = skill.Id;
            existingSkill.Name = skill.Name;

            await dbContext.SaveChangesAsync();
            return existingSkill;

        }

        public async Task<bool> isSkillExist(string Name)
        {
            var existingSkill = await dbContext.Skills.FirstOrDefaultAsync(x => x.Name == Name);
            if (existingSkill == null)
            {
                return false;
            }
            return true;

        }
    }
}
