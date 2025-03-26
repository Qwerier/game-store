using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddDevColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Game",
                newName: "PictureUrl");

            migrationBuilder.AddColumn<string>(
                name: "Developer",
                table: "Game",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PlayerMode",
                table: "Game",
                type: "text[]",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Developer",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "PlayerMode",
                table: "Game");

            migrationBuilder.RenameColumn(
                name: "PictureUrl",
                table: "Game",
                newName: "Author");
        }
    }
}
