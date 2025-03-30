using API.Data;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

string connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection") 
                        ?? throw new InvalidOperationException("Database connection string is missing.");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options => {
    options.UseNpgsql(connectionString);
});
builder.Services.AddCors();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
}
);
app.UseHttpsRedirection();

app.MapControllers();

DbInitializer.InitializeDB(app);

app.Run();