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
    [Route("api/games")]
    public class GamesController : ControllerBase
    {
        private readonly ILogger<GamesController> logger;
        private readonly StoreContext context;
        public GamesController(ILogger<GamesController> logger, StoreContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames(){
            return await context.Games
                        .Include(x=> x.PlayerMode)
                        .AsNoTracking()
                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetProduct(string id)
        {
            Game? game = await context.Games
                            .Include(g=> g.PlayerMode)
                            .AsNoTracking()
                            .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null) return NotFound();

            return Ok(game);
        }
    }
}