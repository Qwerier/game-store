using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class StripeAmountAdapter
    {
        // private decimal amount { get; set; }

        // public StripeAmountAdapter(decimal amount)
        // {
        //     this.amount = amount;
        // }

        public static int ToStripeAmount(decimal amount)
        {
            return (int) Math.Round(amount * 100, MidpointRounding.AwayFromZero);
        }

        public static decimal FromStripeAmount(int amount)
        {
            return amount / 100M;
        }
    }
}