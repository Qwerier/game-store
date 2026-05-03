using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderSubtypes
{
    // Summary of card details
    [Owned]
    public class PaymentSummary
    {
        public int Last4 { get; set; }

        public required string Brand { get; set; }

        [JsonPropertyName("exp_month")]
        public int ExpMonth { get; set; }

        [JsonPropertyName("exp_year")]
        public int ExpYear { get; set; }
    }
}