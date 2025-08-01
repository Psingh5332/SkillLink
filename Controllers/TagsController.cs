using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagRepository tagRepository;
        private readonly IMapper mapper;

        public TagsController(ITagRepository tagRepository, IMapper mapper)
        {
            this.tagRepository = tagRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tagDomains = await tagRepository.GetAllAsync();

            var tagDto = new List<TagDto>();

            foreach (var item in tagDomains)
            {
                tagDto.Add(new TagDto
                {
                    Id = item.Id,
                    Name = item.Name
                });
            }
            return Ok(tagDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var tagDomain = await tagRepository.GetByIDAsync( id);

            if (tagDomain == null)
            {
                return NotFound();
            }


            //Map Domain to dto

           

            var tagDto = mapper.Map<TagDto>(tagDomain);
            //var tagDto = new TagDto
            //{
            //    Id = tagDomain.Id,
            //    Name = tagDomain.Name
            //};

            // return dto
            return Ok(tagDto);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddTagRequestDto addTagRequestDto)
        {
            if (addTagRequestDto != null)
            {
                //map Dto to Domain Model
                var tagDomain = new Tag
                {
                    Id = Guid.NewGuid(),
                    Name = addTagRequestDto.Name,
                    
                };

                await tagRepository.CreateAsync(tagDomain);
                return Ok(tagDomain);
            }
            return BadRequest();
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTagRequestDto updateRequestDto)
        {
            // Map DTO to Domain Model

            // var tagDomain = mapper.Map<Tag>(updateRequestDto);

            var tagDomain = new Tag
            {
                Id = updateRequestDto.Id,
                Name = updateRequestDto.Name
            };
            tagDomain = await tagRepository.UpdateAsync(id,tagDomain);

            if (tagDomain == null)
            {
                return NotFound();
            }

            //Map Domain to DTO Model

            var tagDto = mapper.Map<TagDto>(tagDomain);


            return Ok(tagDto);

          //  return CreatedAtAction(nameof(GetById), new { id = tagDto.Id }, tagDomain);


        }



        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var tagDomain = await tagRepository.DeleteAsync(id);

            if (tagDomain == null)
            {
                return NotFound();
            }
            //Map Domain to DTO
            var tagDto = mapper.Map<TagDto>(tagDomain);
            return Ok(tagDto);
        }

    }


}
