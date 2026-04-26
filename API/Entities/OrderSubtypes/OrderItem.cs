using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderSubtypes
{
    public class OrderItem
    {
        public int Id { get; set; }

        public required GameItemOrdered ItemOrdered { get; set; }
    
        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}