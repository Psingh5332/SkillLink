using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Data;

namespace SkillLink.Repositories
{
    public class CategoryRepository : ICategory
    {
        private readonly SkillLinkDbContext dbContext;

        public CategoryRepository(SkillLinkDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            if (category == null)
            {
                return null;
            }
            
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteAsync(Guid id)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCategory == null) 
            {
                return null;
            }
            dbContext.Categories.Remove(existingCategory);
            await dbContext.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category?> GetByNameAsync(string Name)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x => x.Name == Name);
        }

        public async Task<Category?> UpdateAsync(Guid id, Category category)
        {
            var existingCategory=await dbContext.Categories.FirstOrDefaultAsync(x=>x.Id == id);

            if (existingCategory == null)
            {
                return null;
            }
            existingCategory.Id = category.Id;
            existingCategory.Name = category.Name;

            await dbContext.SaveChangesAsync();
            return existingCategory;
        }
        public async Task<bool> isCategoryExist(string Name)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Name == Name);
            if (existingCategory == null)
            {
                return false;
            }
            return true;

        }
    }
}
