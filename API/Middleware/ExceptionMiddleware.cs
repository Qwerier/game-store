using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        private IHostEnvironment _env { get; set; }

        private ILogger<ExceptionMiddleware> _logger { get; set; }
        public ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger)
        {
            _env = env;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // formats the object
            ProblemDetails response = new()
            {
                Status = 500,
                Detail = _env.IsDevelopment()?  ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };

            var serializerPolicy = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, serializerPolicy);
        
            await context.Response.WriteAsync(json);
        }
    }
}