using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DbInitializer
    {
        public static void InitializeDB(WebApplication app){
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retrieve store context");
            SeedModeData(context);
            SeedModeData(context);
        }

        private static void SeedGameData(StoreContext context)
        {
            //context.Database.Migrate(); // ensures database creation if not and pending migrations
            
            if (context.Games.Any()) return;

            var products = new List<Game>
            {                
                new() {
                    Name = "Assassin's Creed",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("13/11/2007"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Ubisoft",
                    Developer = "Ubisoft Montreal",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=0
                },
                new() {
                    Name = "Red Dead Redemption 2",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 1500,
                    ReleaseDate= DateTime.SpecifyKind(DateTime.Parse("05/11/2019"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/Red_Dead_Redemption_II.jpg",
                    Publisher = "Rockstar Games",
                    Developer = "Rockstar Games",
                    Genre ="Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=2

                },
                new() {
                    Name = "Cyberpunk 2077",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("10/12/2020"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/Cyberpunk_2077.jpg",
                    Publisher = "CD Projekt",
                    Developer = "CD Projekt",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=2
                },
                new() {
                    Name = "Baldur's Gate 3",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("03/08/2023"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Larian Studios",
                    Developer = "Larian Studios",
                    Genre= "Role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=2
                },
                new() {
                    Name = "Black Myth: Wukong",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("20/08/2024"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Game Science",
                    Developer = "Game Science",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=0
                },
                new() {
                    Name = "Grand Theft Auto V",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("17/09/2013"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Rockstar Games",
                    Developer = "Rockstar North",
                    Genre="Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=2
                },
                new() {
                    Name = "Elden Ring",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("25/02/2022"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Bandai Namco Entertainment",
                    Developer = "FromSoftware",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=2
                },
                new() {
                    Name = "Call of Duty: Black Ops Cold War",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("13/11/2020"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Activision",
                    Developer = "Treyarch",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId= 1,
                },
                new() {
                    Name = "Hogwarts Legacy",
                    Description =
                        "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue..",
                    Price = 30000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("10/02/2023"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-core2.png",
                    Publisher = "Warner Bros. Games",
                    Developer = "Avalanche Software",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=0
                },
                new() {
                    Name = "Overwatch",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("24/05/2016"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-ang1.png",
                    Publisher = "Blizzard Entertainment",
                    Developer = "Blizzard Entertainment",
                    Genre = "First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=1
                },
                new() {
                    Name = "Indiana Jones and the Great Circle",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 30,
                    ReleaseDate=DateTime.SpecifyKind(DateTime.Parse("09/12/2024"), DateTimeKind.Utc),
                    PictureUrl = "/images/games/sb-ang1.png",
                    Publisher = "Bethesda Softworks",
                    Developer = "Machine Games",
                    Genre = "Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=0
                },
            };

            context.Games.AddRange(products);

            context.SaveChanges();
        }

        private static void SeedModeData(StoreContext context)
        {
            if (context.Games.Any()) return;

            var modes = new List<Mode>{
                new(){
                    Id = 0,
                    PlayerMode = "Single-player"
                },
                new(){
                    Id = 1,
                    PlayerMode = "Multiplayer"
                },
                new(){
                    Id = 2,
                    PlayerMode = "Both"
                }
            };

            context.Modes.AddRange(modes);

            context.SaveChanges();
        }
    }
}