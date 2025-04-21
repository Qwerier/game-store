using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CartItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        // navigation properties for 1->1 relationship with Game table
        public string? GameId { get; set; }

        public required Game Game { get; set; }
    }
}