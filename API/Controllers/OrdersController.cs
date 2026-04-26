using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderSubtypes;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private ILogger<OrdersController> logger;
        private readonly StoreContext context;

        public OrdersController(StoreContext storeContext)
        {
            this.context = storeContext;
        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            string? email = User.FindFirstValue(ClaimTypes.Email);
            if (email is null) return Unauthorized();
            
            var orders = await context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.BuyerEmail == email)
                .ToListAsync();

            return orders;
        }
        [Authorize]
        [HttpGet("{id:string}")]
        public async Task<ActionResult<Order>> GetOrderDetails(string id)
        {
            string? email = User.FindFirstValue(ClaimTypes.Email);
            if (email is null) return Unauthorized();

            var order = await context.Orders
                .Where(o => o.BuyerEmail == email && o.Id == id)
                .FirstOrDefaultAsync();
            
            if(order == null) return NotFound();

            return order;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var basket = await context.Baskets.GetBasket(Request.Cookies["basketCookieId"]);
            if (basket == null || basket.Items.Count == 0)
            {
                return BadRequest("Basket is empty or not found");
            }
            // populate order lines
            var items = CreateOrderItems(basket.Items);

            var subtotal = items.Sum(i => i.Quantity * i.Price);
            var deliveryFee = CalculteDeliveryFee(subtotal);

            var order = new Order
            {
                OrderItems = items,
                BuyerEmail = User.FindFirstValue(ClaimTypes.Email),
                ShippingAddress = createOrderDto.ShippingAddress,
                DeliveryFee = deliveryFee,
                Subtotal = subtotal,
                PaymentSummary = createOrderDto.PaymentSummary,
                PaymentIntentId = basket.PaymentIntentId
            };

            context.Orders.Add(order);

            // cleanup as basket has run its lifecycle
            context.Baskets.Remove(basket);
            Response.Cookies.Delete("basketCookieId");
        
            var result = await context.SaveChangesAsync()> 0;

            if (!result) return BadRequest("Problem creating order");

            return CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order);
        }

        private static decimal CalculteDeliveryFee(decimal subtotal)
        {
            return subtotal > 100 ? 0 : 5;
        }

        // public int Id { get; set; }
        // public required GameItemOrdered ItemOrdered { get; set; }
        // public decimal Price { get; set; }
        // public int Quantity { get; set; }
        private List<OrderItem> CreateOrderItems(List<BasketItem> items)
        {
            return items.Select(i => 
                new OrderItem
                {
                    ItemOrdered = new GameItemOrdered{ GameId = i.GameId, Name = i.Game.Name, PictureUrl = i.Game.PictureUrl},
                    Price = i.Game.Price,
                    Quantity = i.Quantity
                }
            ).ToList();
        }
    }


}