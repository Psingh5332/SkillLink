using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkillLink.Model.Domain;

namespace SkillLink.Data
{
    public class SkillLinkIdentityDbContext: IdentityDbContext<ApplicationUser>
    {
        public SkillLinkIdentityDbContext(DbContextOptions<SkillLinkIdentityDbContext> options) :base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userId = "cda8ec06-af61-4627-8c82-3b3de4ac1ae0";
            var adminId = "5c83c52e-9426-46a3-b5b2-a6a591ca39f1";
            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id=userId,
                    ConcurrencyStamp=userId,
                    Name="User",
                    NormalizedName="User".ToUpper()

                },
                 new IdentityRole
                {
                    Id=adminId,
                    ConcurrencyStamp=adminId,
                    Name="Admin",
                    NormalizedName="Admin".ToUpper()

                }

            };
            //seeding in builder object
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
