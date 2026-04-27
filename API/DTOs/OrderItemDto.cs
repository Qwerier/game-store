using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderItemDto
    {
      public string GameId { get; set; } = null!;

      public required string Name { get; set; }

      public required string PictureUrl { get; set; }

      public decimal Price { get; set; }

      public int Quantity { get; set; }
    }
}