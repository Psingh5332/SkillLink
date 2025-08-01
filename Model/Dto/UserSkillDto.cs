namespace SkillLink.Model.Dto
{
    public class UserSkillDto
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public int? Rating { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string Duration { get; set; }
    }
}
