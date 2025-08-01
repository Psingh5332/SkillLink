using Microsoft.EntityFrameworkCore;
using SkillLink.Data;
using SkillLink.Model.Domain;
using System.Data.Common;
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
        public async Task<int> CountByUserAsync(string id)
        {
            return await dbContext.Articles.CountAsync(a => a.UserId == id);
        }

        public async Task<Article> CreateAsync(Article article)
        {

            await dbContext.Articles.AddAsync(article);
            await dbContext.SaveChangesAsync();
            return article;
        }

        public async Task<Article?> DeleteAsync(Guid id)
        {
            var existingArticle = await dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
            if (existingArticle == null)
            {
                return null;
            }

            dbContext.Articles.Remove(existingArticle);
            await dbContext.SaveChangesAsync();

            return existingArticle;
        }

        public async Task<List<Article>> GetAllAsync()
        {
            return await dbContext.Articles.Include(x=>x.User).Include(x=>x.category).ToListAsync();
        }

        public async Task<List<Article>> GetAllByUserAsync(string id)
        {
            return await dbContext.Articles.Include(x=>x.User).Include(x=>x.category).Where(x => x.UserId == id).ToListAsync();
        }

        public async Task<Article?> GetByIdAsync(Guid id)
        {
            return await dbContext.Articles.Include(x=>x.User).Include(x=>x.category).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Article> UpdateAsync(Guid id, Article article)
        {
            var existingArticle=await dbContext.Articles.FirstOrDefaultAsync(x=>x.Id==id);
            if (existingArticle == null)
            {
                return null;
            }
            existingArticle.UserId = article.UserId;
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

        public async Task<int> GetSkillsByUser(string  id)
        {
            return await dbContext.Articles.Where(x=>x.UserId==id).CountAsync();
        }
    }
}
