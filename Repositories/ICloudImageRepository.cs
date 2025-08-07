namespace SkillLink.Repositories
{
    public interface ICloudImageRepository
    {
        public Task<string> UploadAsync(IFormFile file);
    }
}
