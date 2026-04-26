using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderSubtypes;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public required ShippingAddress ShippingAddress { get; set; }

        public required PaymentSummary PaymentSummary { get; set; }
    }
}