using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderSubtypes
{
    [Table("Order")]
    public class Order
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        // used for retrieval
        public required string BuyerEmail { get; set; }

        public required ShippingAddress ShippingAddress { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public List<OrderItem> OrderItems { get; set; } = [];

        public decimal Subtotal { get; set; }

        public decimal DeliveryFee { get; set; }

        public string? PaymentIntentId { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        public required PaymentSummary PaymentSummary { get; set; }

        public decimal GetTotal()
        {
            return Subtotal +  DeliveryFee;
        }
    }
}