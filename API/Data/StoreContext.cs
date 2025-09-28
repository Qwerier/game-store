using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public required DbSet<Game> Games { get; set; }
        
        public required DbSet<Mode> Modes {get; set; }
        
        public required DbSet<Basket> Baskets { get; set; }
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }

    }
}