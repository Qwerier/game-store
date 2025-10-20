using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class GameExtensions
    {
        public static GameDto ToDto(this Game game)
        {
            return new GameDto
            {
                Id = game.Id,
                Name = game.Name,
                Description = game.Description,
                PictureUrl = game.PictureUrl,
                Price = game.Price,
                Genre = game.Genre,
                Publisher = game.Publisher,
                Developer = game.Developer,
                ReleaseDate = game.ReleaseDate,
                QuantityInStock = game.QuantityInStock,
                PlayerMode = game.PlayerMode!.PlayerMode
            };
        }
    }
}