using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ITagRepository tagRepository;
        private readonly ICategory categoryRepository;
        private readonly IUserSkillRepository userSkillRepository;
        private readonly ISkillRepository skillRepostiory;
        private readonly IEventRepository eventRepository;
        private readonly IArticleRepository articleRepository;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminController(ITagRepository tagRepository, 
                               ICategory categoryRepository,
                               IUserSkillRepository userSkillRepository,
                               ISkillRepository skillRepostiory,
                               IEventRepository eventRepository,
                               IArticleRepository articleRepository,
                               UserManager<ApplicationUser> userManager)
        {
            this.tagRepository = tagRepository;
            this.categoryRepository = categoryRepository;
            this.userSkillRepository = userSkillRepository;
            this.skillRepostiory = skillRepostiory;
            this.eventRepository = eventRepository;
            this.articleRepository = articleRepository;
            this.userManager = userManager;
        }


        [HttpGet("summary")]
        public async Task<ActionResult<AdminDashboardSummeryDto>> GetDashboardSummary()
        {
            var totalUsersTask =userManager.Users.CountAsync();
            var totalEventsTask = eventRepository.GetAllAsync();
            var totalArticlesTask = articleRepository.GetAllAsync();
            await Task.WhenAll(totalUsersTask, totalEventsTask, totalArticlesTask);

            var summary = new AdminDashboardSummeryDto
            {
                TotalUsers = totalUsersTask.Result,
                TotalEvents = totalEventsTask.Result.Count,
                TotalArticles = totalArticlesTask.Result.Count
            };

            return Ok(summary);
        }
    }
}
