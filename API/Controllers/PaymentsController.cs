using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController(StoreContext db, PaymentsService paymentsService
    , IConfiguration configuration, ILogger<PaymentsController> logger) : ControllerBase
    {

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePayment()
        {
            string? cookie = Request.Cookies["basketCookieId"];
            Basket? basket = await db.Baskets
                .GetBasket(cookie);

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

        public async Task<IActionResult> StripeWebhook()
        {
            string json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);

                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }

                if (intent.Status == "succeeded") await HandleSuccess(intent);
                else await HandleFailure(intent);

                return Ok();
            }
            catch (StripeException stripeEx)
            {
                logger.LogError(stripeEx, "Stripe hook error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An unexpected error has occurred");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json
                , Request.Headers["Stripe-Signature"]
                , configuration["Stripe:WhSecret"]
                );
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct Stripe webhook event");
                throw new StripeException("Invalid signature");
            }
        }
    }
}