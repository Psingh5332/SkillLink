using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository eventRepository;
        private readonly IImageRepostiriy imgRepository;
        private readonly IMapper mapper;

        public EventController(IEventRepository eventRepository, IImageRepostiriy imgRepository, IMapper mapper)
        {
            this.eventRepository = eventRepository;
            this.imgRepository = imgRepository;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var EventDomains = await eventRepository.GetAllAsync();

            var EventDto = new List<EventDto>();

            foreach (var item in EventDomains)
            {
                EventDto.Add(new EventDto
                {
                    Id = item.Id,
                    Title = item.Title,
                    Description = item.Description,
                    Date = item.Date,
                    Time = item.Time,
                    Type = item.Type,
                    Location = item.Location,
                    ImageUrl = item.ImageUrl,
                    isPublic = item.isPublic,
                    Created = item.Created,
                });
            }
            return Ok(EventDto);
        }



        [HttpPost]

        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] AddEventRequestDto eventReqDto)
        {
            if (ModelState.IsValid)
            {
                var eventDomainModel = new Event
                {
                    Id = Guid.NewGuid(),
                    Title = eventReqDto.Title,
                    Type = eventReqDto.Type,
                    Location = eventReqDto.Location,
                    Description = eventReqDto.Description,
                    ImageUrl = eventReqDto.ImageUrl,
                    isPublic = eventReqDto.isPublic,
                    Date=eventReqDto.Date,
                    Time=eventReqDto.Time,
                    Created=eventReqDto.Created

                };

                //eventDomainModel.Created = DateOnly.Parse(eventReqDto.Created);
                //eventDomainModel.Date = DateOnly.Parse(eventReqDto.Date);
                //eventDomainModel.Time = TimeOnly.Parse(eventReqDto.Time);

                //Created = eventReqDto.Created,
                //Date = eventReqDto.Date,
                //Time = eventReqDto.Time,
                //Map DTO to Domain Model
                // var eventDomainModel = mapper.Map<Event>(eventReqDto);



                await eventRepository.CreateAsync(eventDomainModel);

                //Map Domain Model to DTO

                //  var eventDto = mapper.Map<AddEventRequestDto>(eventDomainModel);

                return Ok(eventDomainModel);

                //  return CreatedAtAction(nameof(GetById), new { id = eventDto.Id }, eventDto);
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                return BadRequest(errors);

            }
        }



        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var EventDomain = await eventRepository.DeleteAsync(id);

            if (EventDomain == null)
            {
                return NotFound();
            }
            //Map Domain to DTO
            var categoryDto = mapper.Map<EventDto>(EventDomain);
            return Ok(categoryDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventRequestDto updateRequestDto)
        {
            // Map DTO to Domain Model

            var EventDomain = new Event
            {
                Id = updateRequestDto.Id,
                Title = updateRequestDto.Title,
                Type = updateRequestDto.Type,
                Location = updateRequestDto.Location,
                Description = updateRequestDto.Description,
                ImageUrl = updateRequestDto.ImageUrl,
                isPublic = updateRequestDto.isPublic,
                Date = updateRequestDto.Date,
                Time = updateRequestDto.Time,
                Created = updateRequestDto.Created
            };
            EventDomain = await eventRepository.UpdateAsync(id, EventDomain);

            if (EventDomain == null)
            {
                return NotFound();
            }

            //Map Domain to DTO Model

            var EventDto = mapper.Map<EventDto>(EventDomain);


            return Ok(EventDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var eventDomain = await eventRepository.GetByIdAsync(id);

            if (eventDomain == null)
            {
                return NotFound();
            }


            //Map Domain to dto
            var categoryDto = mapper.Map<EventDto>(eventDomain);
            return Ok(categoryDto);
        }
    }
}
