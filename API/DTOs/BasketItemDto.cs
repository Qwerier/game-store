using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketItemDto
    {
        public string? GameId { get; set; }

        public required string Name { get; set; }

        public required string PictureUrl { get; set; }

        public required string Genre { get; set; }

        public required string Publisher { get; set; }

        public decimal Price { get; set; }

        // property belongs to BasketItem entity
        public int Quanity { get; set; }
   
    }
}