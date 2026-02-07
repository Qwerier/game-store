using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Stripe;
using API.Extensions;

namespace API.Services
{
    public class PaymentsService(IConfiguration configuration)
    {
        private readonly IConfiguration configuration;

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = configuration["Stripe__SecretKey"];

            PaymentIntentService service = new();
            PaymentIntent intent = new ();
            // calculate totals
            decimal total = basket.Items.Sum(item => item.Quantity * item.Game.Price);
            decimal deliveryFee = total > 100 ? 0 : 5;

            //first time declaring intent
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                  Amount = StripeAmountAdapter.ToStripeAmount(total + deliveryFee),
                  Currency= "usd",
                  PaymentMethodTypes = ["card"]
                };

                intent = await service.CreateAsync(options);
            }
            // updating intent on basket changes
            else
            {
                var options  = new PaymentIntentUpdateOptions
                {
                  Amount = StripeAmountAdapter.ToStripeAmount(total + deliveryFee)  
                };

                intent = await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return intent;
        }
    }
}