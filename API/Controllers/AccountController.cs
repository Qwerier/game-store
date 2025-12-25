using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public SignInManager<User> _signInManager { get; set; }

        public AccountController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            User user = new() { UserName = registerDto.UserName, Email = registerDto.Email};

            IdentityResult result = await _signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _signInManager.UserManager.AddToRoleAsync(user, "Member");
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var normalizedEmail = _signInManager.UserManager.NormalizeEmail(loginDto.Email);
            
            User? user = await _signInManager.UserManager.FindByEmailAsync(normalizedEmail);

            if(user is null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(
                user,
                loginDto.Password,
                lockoutOnFailure: false // momentarily as a control mechanism
            );

            if (result.Succeeded)
            {
                // set cookie but dont keep it if browser closes
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }

            return Unauthorized();
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            // User built from authentication middleware
            if (User.Identity?.IsAuthenticated == false) return NoContent();
            
            //actual db user
            User? user = await _signInManager.UserManager.GetUserAsync(User);

            if(user is null) return Unauthorized();

            IList<string> roles = await _signInManager.UserManager.GetRolesAsync(user);

            return Ok(new
            {
                Email = user.Email,
                UserName = user.UserName,
                Roles = roles
            });
        }

        // post annotated as it changes state, so doesnt necessarily delete sth
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            //remove the cookie from user browser as cookie can't be touched from React
            await _signInManager.SignOutAsync();

            return NoContent();
        }
    }
}