using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderSubtypes
{
    // Summary of card details
    [Owned]
    public class PaymentSummary
    {
        public int Last4Digits { get; set; }

        public required string Brand { get; set; }

        public int ExpMonth { get; set; }

        public int ExpYear { get; set; }
    }
}