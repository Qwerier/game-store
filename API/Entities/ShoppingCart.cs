using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        
        public required string CartId { get; set; }

        public List<CartItem> Items { get; set; } = [];

        public void AddItem(Game game, int quantity)
        {
            if (game == null) ArgumentNullException.ThrowIfNull(game);
            if (quantity == 0) throw new ArgumentException("Quantity must be positive", nameof(quantity));

            CartItem? existingItem = FindItem(game.Id);
            
            if (existingItem == null)
            {
                Items.Add(new CartItem
                {
                    Game = game,
                    Quantity = quantity
                });
            } 
            else existingItem.Quantity += quantity;
        }

        public void RemoveItem(string gameId, int quantity){
            if (string.IsNullOrEmpty(gameId)) throw new ArgumentException("GameId musn't be empty");
            if (quantity <= 0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity));

            CartItem? existingItem = FindItem(gameId);

            if (existingItem == null) return; // there's no removal

            if (quantity >= existingItem.Quantity) Items.Remove(existingItem);
            
            existingItem.Quantity -= quantity;
        }
        private CartItem? FindItem(string gameId){
            return Items.FirstOrDefault(item => item.GameId == gameId);
        }
    }


}