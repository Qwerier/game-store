using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderSubtypes
{
    // could be flattened but its beneficial since it adheres to domain modeling rules and can be reused
    [Owned]
    public class GameItemOrdered
    {
        public string GameId { get; set; } = null!;

        public required string Name { get; set; }

        public required string PictureUrl { get; set; }
    }
}