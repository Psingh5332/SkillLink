using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Data;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly SkillLinkDbContext dbContext;

        public TagRepository(SkillLinkDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Tag>> GetAllAsync()
        {
            return await dbContext.Tags.ToListAsync();
        }

        public async Task<Tag> CreateAsync(Tag tag)
        {
            if (tag == null)
            {
                return null;
            }

            await dbContext.Tags.AddAsync(tag);
            await dbContext.SaveChangesAsync();

            return tag;
        }

        public async Task<Tag?> DeleteAsync(Guid id)
        {
            var existingTag = await dbContext.Tags.FirstOrDefaultAsync(x => x.Id == id);
            if (existingTag == null)
            {
                return null;
            }
            dbContext.Tags.Remove(existingTag);
            await dbContext.SaveChangesAsync();
            return existingTag;
        }

       

        public async Task<Tag?> GetByIDAsync(Guid id)
        {
            return await dbContext.Tags.FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<Tag?> UpdateAsync(Guid id, Tag tag)
        {
            var existingTag = await dbContext.Tags.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTag == null)
            {
                return null;
            }
            existingTag.Id = tag.Id;
            existingTag.Name = tag.Name;

            await dbContext.SaveChangesAsync();
            return existingTag;
        }
        public async Task<bool> isTagExist(string name)
        {
            var existingTag=await dbContext.Tags.FirstOrDefaultAsync(x=>x.Name==name);
            if (existingTag == null)
            {
                return false;
            }
            return true;
        }
    }
}
