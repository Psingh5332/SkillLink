using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllAsync();
        Task<Event?> GetByIdAsync(Guid id);
        Task<Event?> CreateAsync(Event eventobj);
        Task<Event?> UpdateAsync(Guid id, Event eventobj);
        Task<Event?> DeleteAsync(Guid id);
        Task<bool> isEventExist(string Name);
        Task<List<Event>> GetEventsByUser(Guid userId);
    }
}
