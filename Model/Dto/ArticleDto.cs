using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Model.Dto
{
    public class ArticleDto
    {
        public Guid Id { get; set; }
        public string category { get; set; }
        public string Title { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string ShortDescription { get; set; }
        public string? FeaturedImageUrl { get; set; }
        public string? UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }

        public string UserName { get; set; }
        public bool IsVarified { get; set; }

        public ICollection<Tag> Tags { get; set; }

    }
}
