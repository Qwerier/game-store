using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

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

        public static IQueryable<Game> Sort(this IQueryable<Game> query, string? orderBy)
        {
            return orderBy switch
            {
                "price" => query.OrderBy(g => g.Price),
                "priceDesc" => query.OrderByDescending(g => g.Price),
                _ => query.OrderBy(g => g.Name)
            };
        }

        public static IQueryable<Game> Search(this IQueryable<Game> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            // Postgres specific. Add only when indexes are needed. Otherwise leave it as it is
            // return query.Where(g => EF.Functions.ILike(g.Name, $"%{searchTerm}%"));

            searchTerm = searchTerm.Trim().ToLower();

            return query.Where(g => g.Name.Contains(searchTerm));
        }
        
        public static IQueryable<Game> Filter(this IQueryable<Game> query, string? genres, string? publishers)
        {
            List<string> genresList = [];
            List<string> publishersList = [];

            if (!string.IsNullOrEmpty(genres))
            {
                genresList.AddRange(genres.ToLower().Split(','));
            }
            if (!string.IsNullOrEmpty(publishers))
            {
                publishersList.AddRange(publishers.ToLower().Split(','));
            }

            if (genresList.Count != 0)
            {
                query = query.Where(g => genresList.Contains(g.Genre.ToLower()));
            }
            if (publishersList.Count != 0)
            {
                query = query.Where(g => publishersList.Contains(g.Publisher.ToLower()));
            }

            return query;
        }
    }
}