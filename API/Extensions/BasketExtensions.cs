using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto ToDto(this Basket basket){
            return new BasketDto{
                BasketId = basket.CookieId,
                ClientSecret = basket.ClientSecret,
                PaymentIntentId = basket.PaymentIntentId,
                Items = basket.Items.Select(item => new BasketItemDto{
                    GameId = item.GameId,
                    Name = item.Game.Name,
                    Price = item.Game.Price,
                    PictureUrl = item.Game.PictureUrl,
                    Genre = item.Game.Genre,
                    Publisher = item.Game.Publisher,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}