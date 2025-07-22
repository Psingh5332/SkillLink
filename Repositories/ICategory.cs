using SkilLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface ICategory
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(Guid id);
        Task<Category?> GetByNameAsync(string Name);
        Task<Category> CreateAsync(Category category);
        Task<Category?> UpdateAsync(Guid id,  Category category);
        Task<Category?> DeleteAsync(Guid id);
        Task<bool> isCategoryExist(string Name);
    }
}
