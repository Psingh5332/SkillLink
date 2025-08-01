using Microsoft.AspNetCore.Mvc.Rendering;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;
using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class AddUserSkillRequestDto
    {
        //public Guid Id { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string UserId { get; set; }

        public string Description { get; set; }
        public int? Rating { get; set; }

        public string? ThumbnailUrl { get; set; }
        [Required]
        public string Duration { get; set; }
        
      
        
    }
}
