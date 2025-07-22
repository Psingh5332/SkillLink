using SkilLink.Model.Domain;

namespace SkillLink.Model.Domain
{
    public class UserSkills
    {
        public Guid Id { get; set; }   
        public Guid SkillId { get; set; }
        public string  UserId { get; set; }

        public SkillType Type { get; set; }
      
        public string Availability { get; set; }
        public string Description { get; set; }

        public Skills Skill { get; set; }
        public ApplicationUser User { get; set; }


    }

    public enum SkillType
    {
        Offered,
        Desired
    }

   
}
