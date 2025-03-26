using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ModeMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerMode",
                table: "Game");

            migrationBuilder.AddColumn<int>(
                name: "PlayerModeId",
                table: "Game",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Modes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlayerMode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Game_PlayerModeId",
                table: "Game",
                column: "PlayerModeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Game_Modes_PlayerModeId",
                table: "Game",
                column: "PlayerModeId",
                principalTable: "Modes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Game_Modes_PlayerModeId",
                table: "Game");

            migrationBuilder.DropTable(
                name: "Modes");

            migrationBuilder.DropIndex(
                name: "IX_Game_PlayerModeId",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "PlayerModeId",
                table: "Game");

            migrationBuilder.AddColumn<List<string>>(
                name: "PlayerMode",
                table: "Game",
                type: "text[]",
                nullable: false);
        }
    }
}
