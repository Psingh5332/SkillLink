using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface IArticleRepository
    {
        public Task<List<Article>> GetAllAsync();
        public Task<List<Article>> GetAllByUserAsync(Guid id);  //passing userid
        public Task<Article?> GetByIdAsync(Guid id);
        public Task<Article> CreateAsync(Article article);  
        public Task<Article?> UpdateAsync(Guid id, Article article);

        public Task<Article?> DeleteAsync(Guid id);
        public Task<int> CountByUserAsync(Guid id);
        
       

        
    }
}
