using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "2c554a23-058a-4bb8-8f63-aed782bf1702");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "355f0f04-8044-4303-986c-44f75290f584");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "3a13d85c-3fe4-401a-9c5f-a2482adc11f1");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "478d6788-112e-4b30-91a8-1e2dd1fbf73e");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "67fbabf3-3990-4c91-a758-3c83ca9f0a12");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "9afa73ab-d8f1-4095-a637-6d2a44352a3c");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "a070af48-fd23-4355-91f7-a04fefd351c8");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "b64e0cb9-e056-4768-a5ea-37fc557fe666");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "e8e898af-9846-47b0-b1dd-274af4ad13e8");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "ec0972dd-d59d-43b2-927f-b45c8c198196");

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "Id",
                keyValue: "f64da4e0-482c-49fc-babb-402fa5c0f5d1");

            migrationBuilder.DeleteData(
                table: "Mode",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Mode",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Mode",
                keyColumn: "Id",
                keyValue: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Mode",
                columns: new[] { "Id", "PlayerMode" },
                values: new object[,]
                {
                    { 1, "Single-player" },
                    { 2, "Multiplayer" },
                    { 3, "Both" }
                });

            migrationBuilder.InsertData(
                table: "Game",
                columns: new[] { "Id", "Description", "Developer", "Genre", "Name", "PictureUrl", "PlayerModeId", "Price", "Publisher", "QuantityInStock", "ReleaseDate" },
                values: new object[,]
                {
                    { "2c554a23-058a-4bb8-8f63-aed782bf1702", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.", "Treyarch", "First-person shooter", "Call of Duty: Black Ops Cold War", "/images/games/sb-core2.png", 2, 42.50m, "Activision", 100, new DateTime(2020, 11, 13, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "355f0f04-8044-4303-986c-44f75290f584", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Blizzard Entertainment", "First-person shooter", "Overwatch", "/images/games/sb-ang1.png", 2, 20.30m, "Blizzard Entertainment", 100, new DateTime(2016, 5, 24, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "3a13d85c-3fe4-401a-9c5f-a2482adc11f1", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Machine Games", "Action-adventure", "Indiana Jones and the Great Circle", "/images/games/sb-ang1.png", 1, 30m, "Bethesda Softworks", 100, new DateTime(2024, 12, 9, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "478d6788-112e-4b30-91a8-1e2dd1fbf73e", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.", "Larian Studios", "Role-playing", "Baldur's Gate 3", "/images/games/sb-core2.png", 3, 32m, "Larian Studios", 100, new DateTime(2023, 8, 3, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "67fbabf3-3990-4c91-a758-3c83ca9f0a12", "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Game Science", "Action role-playing", "Black Myth: Wukong", "/images/games/sb-core2.png", 1, 30m, "Game Science", 100, new DateTime(2024, 8, 20, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "9afa73ab-d8f1-4095-a637-6d2a44352a3c", "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.", "CD Projekt", "Action role-playing", "Cyberpunk 2077", "/images/games/Cyberpunk_2077.jpg", 3, 18.71m, "CD Projekt", 100, new DateTime(2020, 12, 10, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "a070af48-fd23-4355-91f7-a04fefd351c8", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.", "Ubisoft Montreal", "First-person shooter", "Assassin's Creed", "/images/games/sb-core2.png", 1, 30m, "Ubisoft", 100, new DateTime(2007, 11, 13, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "b64e0cb9-e056-4768-a5ea-37fc557fe666", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Rockstar North", "Action-adventure", "Grand Theft Auto V", "/images/games/sb-core2.png", 3, 36.20m, "Rockstar Games", 100, new DateTime(2013, 9, 17, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "e8e898af-9846-47b0-b1dd-274af4ad13e8", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.", "FromSoftware", "Action role-playing", "Elden Ring", "/images/games/sb-core2.png", 3, 32.30m, "Bandai Namco Entertainment", 100, new DateTime(2022, 2, 25, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "ec0972dd-d59d-43b2-927f-b45c8c198196", "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.", "Rockstar Games", "Action-adventure", "Red Dead Redemption 2", "/images/games/Red_Dead_Redemption_II.jpg", 3, 25m, "Rockstar Games", 100, new DateTime(2019, 11, 5, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { "f64da4e0-482c-49fc-babb-402fa5c0f5d1", "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue..", "Avalanche Software", "First-person shooter", "Hogwarts Legacy", "/images/games/sb-core2.png", 1, 35m, "Warner Bros. Games", 100, new DateTime(2023, 2, 10, 0, 0, 0, 0, DateTimeKind.Utc) }
                });
        }
    }
}
