using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderSubtypes;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        // project to a dto by receiving an IQueryable
        // cannot refactor it as EF Core places constraints
        public static IQueryable<OrderDto> ProjectToDto(this IQueryable<Order> query)
        {
            return query.Select(ord => new OrderDto
            {
                Id = ord.Id,
                BuyerEmail = ord.BuyerEmail,
                ShippingAddress = ord.ShippingAddress,
                OrderDate = ord.OrderDate,
                Subtotal = ord.Subtotal,
                DeliveryFee = ord.DeliveryFee,
                OrderStatus = ord.OrderStatus.ToString(),
                PaymentSummary = ord.PaymentSummary,
                Total = ord.GetTotal(),
                OrderItems = ord.OrderItems.Select(i => new OrderItemDto
                {
                    GameId = i.ItemOrdered.GameId,
                    Name = i.ItemOrdered.Name,
                    PictureUrl = i.ItemOrdered.PictureUrl,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            }).AsNoTracking();
        }

        // transform DB object to DTO
        public static OrderDto ToDto(this Order ord)
        {
            return new OrderDto
            {
                Id = ord.Id,
                BuyerEmail = ord.BuyerEmail,
                ShippingAddress = ord.ShippingAddress,
                OrderDate = ord.OrderDate,
                Subtotal = ord.Subtotal,
                DeliveryFee = ord.DeliveryFee,
                OrderStatus = ord.OrderStatus.ToString(),
                PaymentSummary = ord.PaymentSummary,
                Total = ord.GetTotal(),
                OrderItems = ord.OrderItems.Select(i => new OrderItemDto
                {
                    GameId = i.ItemOrdered.GameId,
                    Name = i.ItemOrdered.Name,
                    PictureUrl = i.ItemOrdered.PictureUrl,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };
        }
    }
}