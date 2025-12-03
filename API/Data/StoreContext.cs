using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User>
    {
        public required DbSet<Game> Games { get; set; }
        
        public required DbSet<Mode> Modes {get; set; }
        
        public required DbSet<Basket> Baskets { get; set; }
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole {Name="Member", NormalizedName="MEMBER", Id="bb20b906-09f0-4e34-a6ad-6d157fd929ad"},
                    new IdentityRole {Name="Admin", NormalizedName="ADMIN", Id="d3d5871b-499f-4a45-addd-4c63646d1167"}
                );
        }

    }
}