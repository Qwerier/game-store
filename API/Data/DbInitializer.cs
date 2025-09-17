using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DbInitializer
    {
        private static DateTime ParseDateCustom(string dateString)
        {
            DateTime dt = DateTime.ParseExact(dateString, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            return DateTime.SpecifyKind(dt, DateTimeKind.Utc);
        }
        
        public static void InitializeDB(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retrieve store context");

            context.Database.Migrate(); // ensures database creation if not and pending migrations

            SeedModeData(context);
            SeedGameData(context);
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
                    Price = 8M,
                    ReleaseDate=ParseDateCustom("13/11/2007"),
                    PictureUrl = "/images/games_artwork/Assassin's_Creed.jpg",
                    Publisher = "Ubisoft",
                    Developer = "Ubisoft Montreal",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=1,
                    // PlayerMode=new Mode { Id = 0, PlayerMode= "SinglePlayer" }
                },
                new() {
                    Name = "Red Dead Redemption 2",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 50.35M,
                    ReleaseDate= ParseDateCustom("05/11/2019"),
                    PictureUrl = "/images/games_artwork/Red_Dead_Redemption_II.jpg",
                    Publisher = "Rockstar Games",
                    Developer = "Rockstar Games",
                    Genre ="Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=3,
                    // PlayerMode=new Mode { Id = 2, PlayerMode= "Both" }
                },
                new() {
                    Name = "Cyberpunk 2077",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18M,
                    ReleaseDate=ParseDateCustom("10/12/2020"),
                    PictureUrl = "/images/games_artwork/Cyberpunk_2077.jpg",
                    Publisher = "CD Projekt",
                    Developer = "CD Projekt",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=3,
                    // PlayerMode=new Mode { Id = 2, PlayerMode= "Both" }
                },
                new() {
                    Name = "Baldur's Gate 3",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30M,
                    ReleaseDate=ParseDateCustom("03/08/2023"),
                    PictureUrl = "/images/games_artwork/Baldur's_Gate_3.jpg",
                    Publisher = "Larian Studios",
                    Developer = "Larian Studios",
                    Genre= "Role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=3,
                    // PlayerMode=new Mode { Id = 2, PlayerMode= "Both" }
                },
                new() {
                    Name = "Black Myth: Wukong",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 40M,
                    ReleaseDate=ParseDateCustom("20/08/2024"),
                    PictureUrl = "/images/games_artwork/Black_Myth_Wukong.jpg",
                    Publisher = "Game Science",
                    Developer = "Game Science",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=1,
                    // PlayerMode=new Mode { Id = 0, PlayerMode= "Singleplayer" }
                },
                new() {
                    Name = "Grand Theft Auto V",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25.70M,
                    ReleaseDate=ParseDateCustom("17/09/2013"),
                    PictureUrl = "/images/games_artwork/Grand_Theft_Auto_V.png",
                    Publisher = "Rockstar Games",
                    Developer = "Rockstar North",
                    Genre="Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=3,
                    // PlayerMode=new Mode { Id = 2, PlayerMode= "Both" }
                },
                new() {
                    Name = "Elden Ring",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 60.35M,
                    ReleaseDate=ParseDateCustom("25/02/2022"),
                    PictureUrl = "/images/games_artwork/Elden_Ring.jpg",
                    Publisher = "Bandai Namco Entertainment",
                    Developer = "FromSoftware",
                    Genre="Action role-playing",
                    QuantityInStock = 100,
                    PlayerModeId=3,
                    // PlayerMode=new Mode { Id = 2, PlayerMode= "Both" }
                },
                new() {
                    Name = "Call of Duty: Black Ops Cold War",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 32.5M,
                    ReleaseDate=ParseDateCustom("13/11/2020"),
                    PictureUrl = "/images/games_artwork/BOCW.jpg",
                    Publisher = "Activision",
                    Developer = "Treyarch",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=2,
                    // PlayerMode=new Mode { Id = 1, PlayerMode= "Multiplayer" }
                },
                new() {
                    Name = "Hogwarts Legacy",
                    Description =
                        "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue..",
                    Price = 32M,
                    ReleaseDate=ParseDateCustom("10/02/2023"),
                    PictureUrl = "/images/games_artwork/Hogwarts_Legacy.jpg",
                    Publisher = "Warner Bros. Games",
                    Developer = "Avalanche Software",
                    Genre="First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=1,
                    // PlayerMode=new Mode { Id = 0, PlayerMode= "Singleplayer" }
                },
                new() {
                    Name = "Overwatch",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 15.50M,
                    ReleaseDate=ParseDateCustom("24/05/2016"),
                    PictureUrl = "/images/games_artwork/Overwatch.jpg",
                    Publisher = "Blizzard Entertainment",
                    Developer = "Blizzard Entertainment",
                    Genre = "First-person shooter",
                    QuantityInStock = 100,
                    PlayerModeId=2,
                    // PlayerMode=new Mode { Id = 1, PlayerMode= "Multiplayer" }
                },
                new() {
                    Name = "Indiana Jones and the Great Circle",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 30M,
                    ReleaseDate=ParseDateCustom("09/12/2024"),
                    PictureUrl = "/images/games_artwork/Indiana_Jones_and_the_Great_Circle.jpg",
                    Publisher = "Bethesda Softworks",
                    Developer = "Machine Games",
                    Genre = "Action-adventure",
                    QuantityInStock = 100,
                    PlayerModeId=1,
                    // PlayerMode=new Mode { Id = 0, PlayerMode= "Singleplayer" }
                },
            };

            context.Games.AddRange(products);

            context.SaveChanges();
        }

        private static void SeedModeData(StoreContext context)
        {
            if (context.Modes.Any()) return;

            var modes = new List<Mode>{
                new(){
                   
                    PlayerMode = "Single-player"
                },
                new(){
                    
                    PlayerMode = "Multiplayer"
                },
                new(){
                    
                    PlayerMode = "Single- and Multi- player"
                }
            };

            context.Modes.AddRange(modes);

            context.SaveChanges();
        }
    }
}