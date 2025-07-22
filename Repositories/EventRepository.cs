using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Data;
using SkillLink.Model.Domain;
using System.Runtime.InteropServices;

namespace SkillLink.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly SkillLinkDbContext dbContext;
        private readonly IImageRepostiriy imgRepository;

        public EventRepository(SkillLinkDbContext dbContext, IImageRepostiriy imgRepository)
        {
            this.dbContext = dbContext;
            this.imgRepository = imgRepository;
        }
        public async Task<Event> CreateAsync(Event eventobj)
        { 
              await dbContext.Events.AddAsync(eventobj);
              await dbContext.SaveChangesAsync();

              return eventobj;
        }

        public async Task<Event?> DeleteAsync(Guid id)
        {
            Event? existingEvent =await  dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
            
            if (existingEvent == null)
            {
                return null;
            }
            dbContext.Remove(existingEvent);
            await dbContext.SaveChangesAsync();
            return existingEvent;
        }

        public async Task<List<Event>> GetAllAsync()
        {
            return await dbContext.Events.ToListAsync();
        }

        public async Task<Event?> GetByIdAsync(Guid id)
        {
            return await dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Event>> GetEventsByUser(Guid userId)
        {
            
            return await dbContext.Events.Where(x=>x.UserId==userId).ToListAsync();
        }

        public async Task<bool> isEventExist(string Title)
        {

            Event existingEvent = await dbContext.Events.FirstOrDefaultAsync(x => x.Title == Title);

            if (existingEvent == null)
            {
                return false;
            }
            return true;
        }

        public async Task<Event?> UpdateAsync(Guid id, Event eventobj)
        {
            var existingEvent = await dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
            if (existingEvent == null)
            {
                return null;
            }

            existingEvent.Title =  eventobj.Title;
            existingEvent.Description = eventobj.Description;
            existingEvent.Location = eventobj.Location;
            existingEvent.Created = eventobj.Created;
            existingEvent.Date= eventobj.Date;
            existingEvent.Time = eventobj.Time;
            existingEvent.ImageUrl = eventobj.ImageUrl;
            existingEvent.isPublic = eventobj.isPublic;
            existingEvent.Type = eventobj.Type;
            existingEvent.UserId = eventobj.UserId;

            await dbContext.SaveChangesAsync();
            return existingEvent;
        }
    }
}
