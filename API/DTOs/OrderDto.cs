using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderSubtypes;

namespace API.DTOs
{
    public class OrderDto
    {
        public string Id { get; set; } = null!;

        public required string BuyerEmail { get; set; }

        public required ShippingAddress ShippingAddress { get; set; }

        public DateTime OrderDate { get; set; }

        public required List<OrderItemDto> OrderItems { get; set; }

        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public decimal DeliveryFee { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public required PaymentSummary PaymentSummary { get; set; }
    }
}