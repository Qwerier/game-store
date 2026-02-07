using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.DTOs
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        public readonly StoreContext db;

        public PaymentsService paymentsService;

        public PaymentsController(StoreContext db, PaymentsService paymentsService)
        {
            this.db = db;
            this.paymentsService = paymentsService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePayment()
        {
            Basket? basket = await db.Baskets
                .Include(b => b.Items)
                .ThenInclude(i => i.Game)
                .FirstOrDefaultAsync();
            
            if (basket == null) return BadRequest("Problem with the basket");

            var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest("Problem creating payment intent");

            // in case its first time and basket's instance variables are unassigned
            basket.PaymentIntentId ??= intent.Id;
            basket.ClientSecret = intent.ClientSecret;

            await db.SaveChangesAsync();
            // // first time when values are initialized
            // if (db.ChangeTracker.HasChanges())
            // {
            //     var result = await db.SaveChangesAsync() > 0;

            //     if(!result) return BadRequest("Problem updating basket");
            // }
 
            return basket.ToDto();
        }
    }
}