using SkillLink.Model.Domain;

namespace SkillLink.Repositories
{
    public interface IImageRepostiriy
    {
        public Task<Image> Upload(Image image);
    }
}
