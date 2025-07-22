using SkilLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface ISkillRepository
    {
        Task<List<Skills>> GetAllAsync(string? filterOn=null,string? filterQuery=null, 
                            string? sortBy=null, bool isAscending=true,
                            int pageNumber=1, int pageSize=5);


        Task<Skills?> GetByIdAsync(Guid id);

        Task<Skills?> GetByNameAsync(string name);

        Task<Skills> CreateAsync(Skills skill);

        Task<Skills?> UpdateAsync(Guid id,Skills skill);
        Task<Skills?> DeleteAsync(Guid id);

        Task<bool> isSkillExist(string Name);
    }
}
