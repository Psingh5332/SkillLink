using Microsoft.EntityFrameworkCore;
using SkillLink.Data;
using SkillLink.Model.Domain;
using System.Security.Cryptography.Xml;

namespace SkillLink.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly SkillLinkDbContext dbContext;

        public ArticleRepository(SkillLinkDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<int> CountByUserAsync(Guid id)
        {
            return await dbContext.Articles.CountAsync(a => a.AuthorId == id);
        }

        public Task<Article> CreateAsync(Article article)
        {
            throw new NotImplementedException();
        }

        public async Task<Article> DeleteAsync(Guid id)
        {
            var existingArticle = await dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
            if (existingArticle == null)
            {
                return null;
            }
             dbContext.Articles.Remove(existingArticle);
            dbContext.SaveChangesAsync();
            return existingArticle;
        }

        public async Task<List<Article>> GetAllAsync()
        {
            return await dbContext.Articles.ToListAsync();
        }

        public Task<List<Article>> GetAllByUserAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Article?> GetByIdAsync(Guid id)
        {
            return await dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Article> UpdateAsync(Guid id, Article article)
        {
            var existingArticle=await dbContext.Articles.FirstOrDefaultAsync(x=>x.Id==id);
            if (existingArticle == null)
            {
                return null;
            }
            existingArticle.AuthorId = id;
            existingArticle.Title = article.Title;
            existingArticle.Heading = article.Heading;
            existingArticle.ShortDescription = article.ShortDescription;
            existingArticle.Content = article.Content;
            existingArticle.PublishedDate = article.PublishedDate;
            existingArticle.UrlHandle = article.UrlHandle;
            existingArticle.FeaturedImageUrl = article.FeaturedImageUrl;
            existingArticle.IsVarified = article.IsVarified;
            await dbContext.SaveChangesAsync();
            return existingArticle;
        }
    }
}
