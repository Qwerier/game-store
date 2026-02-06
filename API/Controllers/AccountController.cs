using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            if (!result.Succeeded) return Unauthorized();

            // set cookie but dont keep it if browser closes
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok();
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

        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            var user = await _signInManager.UserManager.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            // no such user exists
            if (user == null) return Unauthorized();

            user.Address = address;
            var result = await _signInManager.UserManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem updating user address");

            return Ok(user.Address);
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetAdress()
        {
            var address = await _signInManager.UserManager.Users
                .Where(u => u.UserName == User.Identity!.Name)
                .Select(u => u.Address)
                .FirstOrDefaultAsync();

            if(address == null) return NoContent();

            return Ok(address);
        }
    }
}