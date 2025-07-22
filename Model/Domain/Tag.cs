namespace SkillLink.Model.Domain
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
      
        public ICollection<Article> Articles { get; set; }
    }
}
