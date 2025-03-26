using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Game")]
    public class Game
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public required string Name { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime ReleaseDate { get; set; }

        public required string PictureUrl { get; set; }

        public required string Genre { get; set; }

        public required string Publisher { get; set; }

        public string? Developer { get; set; }

        public decimal Price { get; set; }

        public int QuantityInStock { get; set; }
   
        public int PlayerModeId { get; set; }

        public Mode? PlayerMode { get; set; }

    }
}