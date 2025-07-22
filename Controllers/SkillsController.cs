using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkilLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SkillsController : ControllerBase
    {
        private readonly ISkillRepository skillRepository;
        private readonly IMapper mapper;

        public SkillsController(ISkillRepository skillRepository, IMapper mapper)
        {
            this.skillRepository = skillRepository;
            this.mapper = mapper;
        }

        //Get:/api/Skills
        //Get:/api/skills?filterOn=Name&filterQuery=Track&sortBy=Name&isAscending=True&pageNumber=1&pageSize=10
        [HttpGet]
        
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, 
                                               [FromQuery] string? filterQuery,
                                               [FromQuery] string? sortBy,[FromQuery] bool? isAscending,
                                               [FromQuery] int pageNumber=1, [FromQuery] int pageSize=5)

        {
             //filtering
            var skillDomain = await skillRepository.GetAllAsync(filterOn,filterQuery,
                                   sortBy, isAscending ?? true,
                                   pageNumber,pageSize);
                       
            //mapper to map domain to dto
            var SkillDto= mapper.Map<List<SkillsDto>>(skillDomain);

            return Ok(SkillDto);
        }

       
        [HttpGet]  //route binding
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var skillDomain = await skillRepository.GetByIdAsync(id);
            if(skillDomain==null)
            {
                return NotFound() ;
            }

            //Map Domain to dto usnig automapper

           var skillDto= mapper.Map<SkillsDto>(skillDomain);
          
            // return dto
            return Ok(skillDto);
        }

        //[HttpGet]
        //[Route("name/{name}")]
        //public async Task<IActionResult> GetByName(string name)
        //{
        //    var skillDomain=await skillRepository.GetByNameAsync(name);
        //    if(skillDomain==null)
        //    {
        //        return NotFound();
        //    }
        //    //Map to Domain to dto
        //    var skillDto=mapper.Map<SkillsDto>(skillDomain);    
        //    return Ok(skillDto);
        //}

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddSkillRequestDto skillReqestdto)
        {
           
            if(ModelState.IsValid)
            {
                //Map DTO to Domain Model
                var skillDomainModel = mapper.Map<Skills>(skillReqestdto);


                await skillRepository.CreateAsync(skillDomainModel);

                //Map Domain Model to DTO

                var skillDto = mapper.Map<SkillsDto>(skillDomainModel);

                //return Ok(skillDomainModel);

                return CreatedAtAction(nameof(GetById), new { id = skillDto.Id }, skillDto);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id,[FromBody] UpdateSkillsRequestDto skillReqestdto)
        {
            // Map DTO to Domain Model

            var skillsDomainModel = mapper.Map<Skills>(skillReqestdto);
          
            skillsDomainModel = await skillRepository.UpdateAsync(id,skillsDomainModel);

            if(skillsDomainModel == null)
            {
                return NotFound();
            }

            //Map Domain to DTO Model

            var skillsDto = mapper.Map<SkillsDto>(skillsDomainModel);
           
             
           // return Ok(skillsDto);

            return CreatedAtAction(nameof(GetById), new { id = skillsDto.Id }, skillsDto);


        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var skillsDomain = await skillRepository.DeleteAsync(id);

            if(skillsDomain==null)
            {
                return NotFound();
            }
            //Map Domain to DTO
            var skillDto = mapper.Map<SkillsDto>(skillsDomain);
            return Ok(skillDto);
        }
    }
}
