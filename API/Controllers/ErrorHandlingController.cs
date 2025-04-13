using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorHandlingController : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound(){
            return NotFound();
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest(){
            return BadRequest("Something's wrong with the request itself");
        }

        [HttpGet("unauthorized")]
        public IActionResult GetUnauthorized(){
            return Unauthorized("Not authorized to access resources");
        }

        [HttpGet("validation-error")]
        public IActionResult GetValidationError(){
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError(){
            throw new Exception("This is a server error");
        }
    }
}