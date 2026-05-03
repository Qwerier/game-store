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
        private readonly StoreContext context;

        public OrdersController(StoreContext storeContext)
        {
            this.context = storeContext;
        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            string? email = User.FindFirstValue(ClaimTypes.Email);
            if (email is null) return Unauthorized();
            
            var orders = await context.Orders
                .ProjectToDto()
                .Where(o => o.BuyerEmail == email)
                .ToListAsync();

            return orders;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderDetails(string id)
        {
            string? email = User.FindFirstValue(ClaimTypes.Email);
            if (email is null) return Unauthorized();

            var order = await context.Orders
                .ProjectToDto()
                .Where(o => o.BuyerEmail == email && o.Id == id)
                .FirstOrDefaultAsync();
            
            if(order == null) return NotFound();

            return order;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var basket = await context.Baskets.GetBasket(Request.Cookies["basketCookieId"]);
            if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                return BadRequest("Basket is empty or not found");
            }
            // populate order lines
            var items = CreateOrderItems(basket.Items);
            if (items is null) return BadRequest("One or some items are out of stock");

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

            return CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order.ToDto());
        }

        private static decimal CalculteDeliveryFee(decimal subtotal)
        {
            return subtotal > 100 ? 0 : 5;
        }

        private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
        {
            // check if any item quantity is higher than what's in stock
            // that means order/shipping cant be carried out
            bool result = items.Any(i => i.Quantity > i.Game.QuantityInStock);
            if(result) return null;

            var receipt = items.Select(i => 
                new OrderItem
                {
                    ItemOrdered = new GameItemOrdered
                    { 
                        GameId = i.GameId, 
                        Name = i.Game.Name, 
                        PictureUrl = i.Game.PictureUrl
                    },
                    Price = i.Game.Price,
                    Quantity = i.Quantity
                }
            ).ToList();

            // update quantity in DB 
            foreach(var i in items)
            {
                i.Game.QuantityInStock -= i.Quantity;
            }
            
            return receipt;
        }
    }


}