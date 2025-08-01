using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface ITagRepository
    {
         Task<List<Tag>> GetAllAsync();

         Task<Tag?> GetByIDAsync(Guid id);

         Task<Tag> CreateAsync(Tag tag);
         
         Task<Tag?> UpdateAsync(Guid id,Tag tag);

         Task<Tag?> DeleteAsync(Guid id);

        Task<bool> isTagExist(string name);
       

    }
}
