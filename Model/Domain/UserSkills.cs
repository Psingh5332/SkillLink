using SkilLink.Model.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillLink.Model.Domain
{
    public class UserSkills
    {
        public Guid Id { get; set; }   
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string  UserId { get; set; }
        public string Description { get; set; }
        public int? Rating { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string Duration { get; set; }
        //navigation 
        public Category category { get; set; }
        public ApplicationUser User { get; set; }


    }

  

   
}
