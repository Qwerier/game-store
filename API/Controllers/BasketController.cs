using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly ILogger<BasketController> logger;

        private readonly StoreContext context;
        public BasketController(ILogger<BasketController> logger, StoreContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket? basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return basket.ToDto();
            //Ok(basket);
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(string gameId, int quantity)
        {
            Basket? basket = await RetrieveBasket();

            basket ??= CreateBasket();

            Game? game = await context.Games.FindAsync(gameId);
            if (game == null) return NotFound(new ProblemDetails { Title = "Problem adding game to basket!" });

            basket.AddItem(game, quantity);

            bool isChanged = await context.SaveChangesAsync() > 0;
            if (isChanged) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket!" });
        }
        
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(string gameId, int quantity)
        {
            Basket? basket = await RetrieveBasket();
            if (basket == null) return NotFound(new ProblemDetails { Title = "Unable to retrieve basket!" });

            basket.RemoveItem(gameId, quantity);

            bool isChanged = await context.SaveChangesAsync() > 0;
            if (isChanged) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket!" });
        }
        
        private Basket CreateBasket()
        {
            string basketCookieId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("basketCookieId", basketCookieId, cookieOptions);
            Basket basket = new Basket { CookieId = basketCookieId };

            // not yet committed to db per Unit of Work pattern
            context.Baskets.Add(basket);
            // no changes saved as it breaks responsibility patterns
            return basket;
        }

        
        private async Task<Basket?> RetrieveBasket()
        {
            string? basketCookieId = Request.Cookies["basketCookieId"];
            Basket? basket = await context.Baskets
                                .Include(basket => basket.Items) // retrieve them through navigation prop
                                .ThenInclude(item => item.Game)
                                .FirstOrDefaultAsync(basket => basket.CookieId == basketCookieId);

            return basket;
        }
    }
}