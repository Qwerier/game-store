using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketDto
    {
        public required string BasketId { get; set; }

        public List<BasketItemDto> Items { get; set; } = [];
    }


}