using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.DTOs;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<ActionResult<List<GameDto>>> GetGames(){
            return await context.Games
                        .Include(x => x.PlayerMode)
                        .AsNoTracking()
                        .Select(g => g.ToDto())
                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetProduct(string id)
        {
            Game? game = await context.Games
                            .Include(g=> g.PlayerMode)
                            .AsNoTracking()
                            .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null) return NotFound();

            return Ok(game.ToDto());
        }
    }

}