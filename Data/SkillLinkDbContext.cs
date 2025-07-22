using Microsoft.EntityFrameworkCore;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Data
{
    public class SkillLinkDbContext : DbContext
    {
        public SkillLinkDbContext(DbContextOptions<SkillLinkDbContext> options) : base(options)
        {

        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Skills> Skills { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<UserSkills> UserSkill { get; set; }
        public DbSet<Article> Articles { get; set; }


    }
}
