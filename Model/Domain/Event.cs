using System.ComponentModel.DataAnnotations.Schema;

namespace SkillLink.Model.Domain
{
    public class Event
    {
        public Guid Id { get; set; }    
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Created { get; set; } 
        public string Date { get; set; }
        public string Time { get; set; }
        public string? Type { get; set; }
        public Guid UserId { get; set; }

        public string? ImageUrl { get; set; }
        public bool isPublic { get; set; }

        //Naviagation 
        [NotMapped]
        public ApplicationUser? applicationUser { get; set; }
    }
}
