using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/mode")]
    public class ModeController : ControllerBase
    {
        private readonly ILogger<GamesController> logger;
        private readonly StoreContext context;
        public ModeController(ILogger<GamesController> logger, StoreContext context)
        {
            this.logger = logger;
            this.context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Mode>>> GetModes(){
            return await context.Modes.AsNoTracking().ToListAsync();
        }
    }
}