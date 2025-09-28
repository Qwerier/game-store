using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Entities
{
    [Table("Basket")]
    public class Basket
    {
        public int Id { get; set; }

        public required string BasketCookieId { get; set; }

        public List<BasketItem> Items { get; set; } = [];

        // prefer this one over other signatures (1)string gameId or 2)BasketItem item)
        // because Basket 1) doesn't have a relationship with Game and 2) manages is own items respectively
        public void AddItem(Game game, int quantity)
        {
            if (game == null) throw new ArgumentNullException(nameof(game));
            if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");

            BasketItem? existingItem = Items.FirstOrDefault(i => i.GameId == game.Id);
 
            if (existingItem == null)
            {
                Items.Add(new BasketItem
                {
                    Basket = this,
                    Game = game,
                    Quantity = quantity
                });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        // general purpose remove method, may change later as it may be doing too much
        public void RemoveItem(string gameId, int quantity)
        {
            if (string.IsNullOrEmpty(gameId)) throw new ArgumentNullException(nameof(gameId), "Quanity must be greater than zero.");

            var item = Items.FirstOrDefault(i => i.GameId == gameId);

            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity <= 0)
            {
                Items.Remove(item);
            }
        }

        public static implicit operator Basket(ActionResult<Basket> v)
        {
            throw new NotImplementedException();
        }
    }
}