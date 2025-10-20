using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class GameDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public required string Genre { get; set; }
        public required string Publisher { get; set; }
        public string? Developer { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int QuantityInStock { get; set; }
        public required string PlayerMode { get; set; }
    }
}