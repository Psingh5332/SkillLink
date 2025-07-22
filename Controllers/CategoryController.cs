using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkilLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory categoryRepository;
        private readonly IMapper mapper;

        public CategoryController(ICategory categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        [HttpGet]

        public async Task<IActionResult> GetAll( )
        {
            var categoryDomains = await categoryRepository.GetAllAsync();

              var categoryDto = new List<CategoryDto>();

            foreach (var item in categoryDomains)
            {
                categoryDto.Add(new CategoryDto
                {
                    Id = item.Id,
                    Name = item.Name
                });
            }

            return Ok(categoryDto);
           
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var categoryDomain=  await categoryRepository.GetByIdAsync(id);

            if(categoryDomain==null)
            {
                return NotFound();
            }

            //Map Domain to dto
            var categoryDto = new CategoryDto
            {
                Id = categoryDomain.Id,
                Name=categoryDomain.Name
            };

            // return dto
            return Ok(categoryDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddCategoryReqestDto addCategoryReqestDto)
        {

            //Map DTO to Domain Model

            var categoryDomainModel = new Category
            {
                Id = Guid.NewGuid(),
                Name = addCategoryReqestDto.Name,
            };

            await categoryRepository.CreateAsync(categoryDomainModel);
            return Ok(categoryDomainModel);

            //return CreatedAtAction(nameof(GetById), new { id = categoryDomainModel.Id });


        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id,[FromBody] UpdateCategoryRequestDto updateCategoryReqestDto)
        {
            // Map dto to domain model

            var categoryDomainModel = new Category
            {
                Id = updateCategoryReqestDto.Id,
                Name = updateCategoryReqestDto.Name
            };

            categoryDomainModel= await categoryRepository.UpdateAsync(id, categoryDomainModel);

            if(categoryDomainModel==null)
            {
                return NotFound();
            }

            //Map domain to dto
            var categoryDto = new CategoryDto
            {
                Id = categoryDomainModel.Id,
                Name = categoryDomainModel.Name,
            };

            return Ok(categoryDto);
            


        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var categoryDomain = await categoryRepository.DeleteAsync(id);

            if (categoryDomain == null)
            {
                return NotFound();
            }
            //Map Domain to DTO
            var categoryDto = mapper.Map<CategoryDto>(categoryDomain);
            return Ok(categoryDto);
        }
    }
}


