namespace SkillLink.Model.Dto
{
    public class LoginResponseDto
    {
        public string? Fullname { get; set; }

        public string JwtToken { get; set; }

        public string? UserName { get; set; }
        public string UserId { get; set; }
        public string UserProfilePic { get; set; }
    }
}
