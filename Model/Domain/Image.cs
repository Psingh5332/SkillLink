using System.ComponentModel.DataAnnotations.Schema;

namespace SkillLink.Model.Domain
{
    public class Image
    {
        public Guid Id { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }
        public string FileName { get; set; }

        public string? Description { get; set; }

        public string FileExtention { get; set; } = string.Empty;

        public long FileSizeInBytes { get; set; }

        public string FilePath { get; set; } = string.Empty;


    }
}
