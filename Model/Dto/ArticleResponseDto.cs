using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Model.Dto
{
    public class ArticleResponseDto
    {
        public Guid Id { get; set; }
        public string categoryName { get; set; }
        public string Title { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string ShortDescription { get; set; }
        public string? FeaturedImageUrl { get; set; }
        public string? UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }

        public string userId { get; set; }
        public bool IsVarified { get; set; }

        public ApplicationUser User { get; set; }
        public List<string> selectedTags { get; set; }
    }
}
