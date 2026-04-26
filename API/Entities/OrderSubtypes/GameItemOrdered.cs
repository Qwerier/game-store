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
        public required string GameId { get; set; } = Guid.NewGuid().ToString();

        public required string Name { get; set; }

        public required string PictureUrl { get; set; }
    }
}