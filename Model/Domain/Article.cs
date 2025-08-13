using SkilLink.Model.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillLink.Model.Domain
{
    public class Article
    {
        public Guid Id { get; set; }    
        public Guid categoryId {get;set;}
        public string Title { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; } 
        public string ShortDescription { get; set; }
        public string? FeaturedImageUrl { get; set; }
        public string? UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }
        
        public string UserId { get; set; }
        public bool IsVarified { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public ApplicationUser User { get; set; }
        public Category category { get; set; }

    }
}
