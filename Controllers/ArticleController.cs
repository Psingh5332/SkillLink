using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;
using System.Security.Claims;
using System.Globalization;
using System.Security.Cryptography.Xml;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository articleRepository;
        private readonly IMapper mapper;
        private readonly IImageRepostiriy imageRepostiriy;
        private readonly ITagRepository tagRepository;

        public ArticleController(IArticleRepository articleRepository, IMapper mapper, IImageRepostiriy imageRepostiriy,
                                  ITagRepository tagRepository)
        {
            this.articleRepository = articleRepository;
            this.mapper = mapper;
            this.imageRepostiriy = imageRepostiriy;
            this.tagRepository = tagRepository;
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

            var userArticles = await articleRepository.GetAllByUserAsync(userId);

            if (userArticles == null)
            {
                return NotFound();
            }
            return Ok(userArticles);


        }


        [Authorize]
        [HttpGet]
        [Route("Feed")]
        public async Task<IActionResult> Feed()
        {


            var userArticles = await articleRepository.GetAllAsync();

            if (userArticles == null)
            {
                return NotFound();
            }
            return Ok(userArticles);


        }

        [Authorize]
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(AddArticleReqestDto articleRequestDto)
        {
            // Extract UserId from Token (Claims)

            if(ModelState.IsValid)
            {
                var articleDomainModel = new Article
                {
                    Id = Guid.NewGuid(),
                    Title = articleRequestDto.Title,
                    Heading = articleRequestDto.Heading,
                    UrlHandle = articleRequestDto.UrlHandle,
                    Content = articleRequestDto.Content,
                    categoryId = articleRequestDto.categoryId,
                    ShortDescription = articleRequestDto.ShortDescription,
                    FeaturedImageUrl = articleRequestDto.FeaturedImageUrl,
                    PublishedDate = articleRequestDto.PublishedDate,
                    UserId = articleRequestDto.AuthorId

                };
                //map tags from selected Tags
                var selectedTags = new List<Tag>();
              

                if (articleRequestDto.selectedTags != null && articleRequestDto.selectedTags.Any())
                {
                    foreach (var selectedTagId in articleRequestDto.selectedTags)
                    {
                        if (Guid.TryParse(selectedTagId, out Guid tagGuid))
                        {
                            var existingTag = await tagRepository.GetByIDAsync(tagGuid);
                            if (existingTag != null)
                            {
                                selectedTags.Add(existingTag);
                            }
                        }
                    }
                }


                articleDomainModel.Tags = selectedTags;

                var articleDomain= await articleRepository.CreateAsync(articleDomainModel);


                //maping domain to Dto

                //var articleResponseDto = new ArticleResponseDto
                //{
                //    Id=articleDomainModel.Id,
                //    //categoryName= articleDomain.category.Name,
                //    Title=articleDomainModel.Title,
                //    Heading= articleDomain.Heading,
                //    UrlHandle= articleDomain.UrlHandle,
                //    IsVarified= articleDomain.IsVarified,
                //    FeaturedImageUrl= articleDomain.FeaturedImageUrl,
                //    Content= articleDomain.Content,
                //    userId= articleDomain.UserId,
                //    ShortDescription= articleDomain.ShortDescription,

                //};
                
                //foreach (var tag in articleDomain.Tags)
                //{
                //    articleResponseDto.selectedTags.Add(tag.Name);
                //}


                return Ok("Save Successfully");
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
            var ArticleDomain = await articleRepository.DeleteAsync(id);

            if (ArticleDomain == null)
            {
                return NotFound();
            }
            //Map Domain to DTO
            //var ArticleDto = mapper.Map<ArticleDto>(ArticleDomain);
            return Ok(ArticleDomain);
        }


        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var articleDomain = await articleRepository.GetByIdAsync(id);

            if (articleDomain == null)
            {
                return NotFound();
            }

            return Ok(articleDomain);
        }




        [Authorize]
        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateArticleRequestDto updateArticleRequestDto)
        {
            // Map DTO to Domain Model

            var ArticleDomain = new Article
            {
                Id = id,
                Title = updateArticleRequestDto.Title,
                Heading = updateArticleRequestDto.Heading,
                UrlHandle = updateArticleRequestDto.UrlHandle,
                Content = updateArticleRequestDto.Content,
                categoryId = updateArticleRequestDto.categoryId,
                ShortDescription = updateArticleRequestDto.ShortDescription,
                FeaturedImageUrl = updateArticleRequestDto.FeaturedImageUrl,
                PublishedDate = updateArticleRequestDto.PublishedDate,
                UserId = updateArticleRequestDto.AuthorId,
                IsVarified = updateArticleRequestDto.IsVarified
            };
            ArticleDomain = await articleRepository.UpdateAsync(id, ArticleDomain);

            if (ArticleDomain == null)
            {
                return NotFound();
            }

            //Map Domain to DTO Model

          //  var EventDto = mapper.Map<ArticleDto>(ArticleDomain);


            return Ok(ArticleDomain);
        }

    }
}
