using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItem")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        // Navigation properties to Game
        public string GameId { get; set; } = null!;

        public required Game Game { get; set; }

        //Navigation property to Basket
        public int BasketId { get; set; }

        public Basket Basket { get; set; } = null!;
    }
    
}