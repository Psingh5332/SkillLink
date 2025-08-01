using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace SkillLink.Model.Dto
{
    public class UpdateUserSkillRequestDto
    {
        public Guid Id { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid UserId { get; set; }

        public string Description { get; set; }

        //Change 
        public string Duration { get; set; }
        public int? Rating { get; set; }

        public string? ThumbnailUrl { get; set; }

    }
}
