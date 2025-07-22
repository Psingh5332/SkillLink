using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class AddArticleReqestDto
    {
        [Required]
        public string Heading { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        public string FeaturedImageUrl { get; set; }
        public string UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }
        public Guid AuthorId { get; set; }
        public bool IsVarified { get; set; }

        public IEnumerable<SelectListItem> Tags { get; set; }
        public string selectedTags { get; set; }
        
    }
}
