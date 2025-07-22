using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillLink.Model.Domain;
using SkillLink.Model.Dto;
using SkillLink.Repositories;
using System.Security.Claims;

namespace SkillLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ISkillRepository skillRepository;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ITokenRepostitory tokenRepository;
        private readonly IImageRepostiriy imgReposotory;

        public AccountController(UserManager<ApplicationUser> userManager, ITokenRepostitory tokenRepository,IImageRepostiriy imgReposotory)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.imgReposotory = imgReposotory;
        }

        //POST: api/Account/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = new ApplicationUser
            {
                FullName = registerRequestDto.FullName,
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username,
                PhoneNumber = registerRequestDto.Phone,
                
            };
            var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);
           
            if (identityResult.Succeeded)
            {
                //add roles to the user
                identityResult = await userManager.AddToRoleAsync(identityUser, "User");

                if (identityResult.Succeeded)
                {
                    return Ok("User Register Sucessfully Please Login.");
                }
            }
            return BadRequest("Something went wrong!!");
        }

        //Post: api/Account/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Username);
            if (user != null)
            {
                bool checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);
                if (checkPasswordResult)
                {
                    // Get roles for the users
                    var roles = await userManager.GetRolesAsync(user);
                   
                    if (roles != null)
                    {
                        //create token
                        var jwtToken = tokenRepository.CreateJWTToken(user, roles.ToList());
                        var response = new LoginResponseDto
                        {
                            Fullname = user.FullName,
                            UserName = user.UserName,
                            JwtToken = jwtToken,
                            UserId=  user.Id,
                            UserProfilePic=user.ProfileImageUrl
                            
                        };
                        return Ok(response);


                    }
                    return Ok("Login Successfully");
                }
            }
            return BadRequest("Username or Password Incorrect");
        }

        //Get: api/Account/Users
       
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userManager.Users.Select(user =>new
            {
                user.Id,
                user.FullName,
                user.UserName,
                user.Email,
                user.PhoneNumber,
                user.ProfileImageUrl
            }).ToListAsync();


            return Ok(users);
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult GetSecretData()
        {
            return Ok("This is protected data");
        }



        [Authorize]
        [HttpGet("me")]
        public IActionResult GetLoggedInUser()
        {
            var username = User.Identity?.Name;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //custom claim
            var fullName = User.FindFirst("FullName")?.Value;

            return Ok(new
            {
                UserId = userId,
                UserName = username,
                Email = email,
                FullName=fullName
            });
        }


        [HttpGet("GetCurrentUser")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var username = User.Identity?.Name; 
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.PhoneNumber,
                // add more fields if needed
                user.ProfileImageUrl
            });
        }
       
        [Authorize]
        [HttpPost]
        [Route("UpdateUser")]
       
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            // Find the user by Id
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found");

            //  var user = await userManager.FindByIdAsync(updateUserDto.UserId);
            if (user == null)
                return NotFound("User not found");

            // Update fields
           
            user.Email = updateUserDto.Email;
            user.PhoneNumber = updateUserDto.Phone;

            // Save changes
            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User updated successfully");

        }


        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            var result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Password changed successfully");
        }


        [Authorize]
        [HttpPost]
        [Route("UpdateProfilePic")]

        public async Task<IActionResult> UpdateProfilePic([FromBody] string ImageUrl)
        {
            // Find the user by Id
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            
            //  var user = await userManager.FindByIdAsync(updateUserDto.UserId);
            if (user == null)
                return NotFound("User not found");

            //Uploading Image 



            // Update fields

            user.ProfileImageUrl=ImageUrl;

            // Save changes
            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.PhoneNumber,
                // add more fields if needed
                user.ProfileImageUrl
            });

        }


       
    }

}
