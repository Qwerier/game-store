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
using API.RequestHelpers;
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
        // by default objects are binded from the body not querystring
        public async Task<ActionResult<List<GameDto>>> GetGames([FromQuery] GameParams gameParams){
            IQueryable<Game> query = context.Games
                    .Include(g => g.PlayerMode)
                    .AsNoTracking();

            query = query
                    .Sort(gameParams.OrderBy)
                    .Search(gameParams.SearchTerm)
                    .Filter(gameParams.Genres, gameParams.Publishers);

            IQueryable<Game> games = query.Paginate(gameParams.PageNumber, gameParams.PageSize);

            Response.AddPaginationHeader(new PaginationMetadata<Game>(query, gameParams.PageSize, gameParams.PageNumber));
            // PaginatedList<Game> games = await PaginatedList<Game>.ToPaginatedList(query,
            //         gameParams.PageNumber, gameParams.PageSize);

            // Response.AddPaginationHeader(games.Metadata);
            
            return await games
                .Select(g => g.ToDto())
                .AsQueryable()
                .ToListAsync();
            
            // return await query
            //             .Select(g => g.ToDto())
            //             .ToListAsync();
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