using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;
using System.Security.Claims;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSkillController : ControllerBase
    {
        private readonly IUserSkillRepository userSkillRepository;
        private readonly IMapper mapper;
        private readonly IImageRepostiriy imageRepostiriy;

        public UserSkillController(IUserSkillRepository userSkillRepository,IMapper mapper, IImageRepostiriy imageRepostiriy )
        {
            this.userSkillRepository = userSkillRepository;
            this.mapper = mapper;
            this.imageRepostiriy = imageRepostiriy;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Extract UserId from Token (Claims)

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token. UserId not found.");
            }

            var userSkillList = await userSkillRepository.GetSkillsByUser(userId);

            if (userSkillList == null)
            {
                return NotFound();
            }
            return Ok(userSkillList);





        }

        [Authorize]
        [HttpGet]
        [Route("GetAllSkills")]
        public async Task<IActionResult> GetAllSkills()
        {
            // Extract UserId from Token (Claims)

          

            var userSkillList = await userSkillRepository.GetAllAsync();

            if (userSkillList == null)
            {
                return NotFound();
            }
            return Ok(userSkillList);



        }



        [Authorize]
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody]AddUserSkillRequestDto userSkillRequestDto)
        {
            if(ModelState.IsValid)
            {
                // dto to domain

                var userSkilDomain = new UserSkills
                {
                    Id = Guid.NewGuid(),
                    Name = userSkillRequestDto.Name,
                    Description = userSkillRequestDto.Description,
                    CategoryId = userSkillRequestDto.CategoryId,
                    ThumbnailUrl = userSkillRequestDto.ThumbnailUrl,
                    Duration = userSkillRequestDto.Duration,
                    Rating = 0,
                    UserId=userSkillRequestDto.UserId
                };
                
                await userSkillRepository.CreateAsync(userSkilDomain);

                return Ok(userSkillRepository);

            }

            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                return BadRequest(errors);

            }
        }

        [HttpPut]
        [Authorize]
        [Route("Update")]
        public async Task<IActionResult> Update(Guid id,UpdateUserSkillRequestDto userSkillRequestDto)
        {

            if (!ModelState.IsValid && userSkillRequestDto == null)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                .Select(e => e.ErrorMessage)
                                .ToList();
                return BadRequest(errors);
            }


            // dto to domain
            var userSkillDomain = mapper.Map<UserSkills>(userSkillRequestDto);
           
            var updated=  await userSkillRepository.UpdateAsync(id,userSkillDomain);
            if (updated == null)
                return StatusCode(500, "Update failed.");

            // domain to dto

            var resultskilldto=mapper.Map<UserSkillDto>(userSkillDomain);

            return Ok(resultskilldto);


            //var userSkilDomain = new UserSkills
            //{
            //    Id = Guid.NewGuid(),
            //    Name = userSkillRequestDto.Name,
            //    Description = userSkillRequestDto.Description,
            //    CategoryId = userSkillRequestDto.CategoryId,
            //    ThumbnailUrl = userSkillRequestDto.ThumbnailUrl,
            //    Duration = userSkillRequestDto.Duration,
            //};
        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userSkillDomain = await userSkillRepository.DeleteAsync(id);

            if (userSkillDomain == null)
            {
                return NotFound();
            }

            //Map Domain to DTO
            var userSkillDto = mapper.Map<UserSkillDto>(userSkillDomain);
            return Ok(userSkillDto);
        }



        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var skillDomain = await userSkillRepository.GetByIdAsync(id);

            if (skillDomain == null)
            {
                return NotFound();
            }


            //Map Domain to dto
            //var userskillDto = mapper.Map<UserSkillDto>(skillDomain);
            return Ok(skillDomain);
        }

    }
}
