using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNamingMode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Game_Modes_PlayerModeId",
                table: "Game");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Modes",
                table: "Modes");

            migrationBuilder.RenameTable(
                name: "Modes",
                newName: "Mode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mode",
                table: "Mode",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Game_Mode_PlayerModeId",
                table: "Game",
                column: "PlayerModeId",
                principalTable: "Mode",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Game_Mode_PlayerModeId",
                table: "Game");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mode",
                table: "Mode");

            migrationBuilder.RenameTable(
                name: "Mode",
                newName: "Modes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Modes",
                table: "Modes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Game_Modes_PlayerModeId",
                table: "Game",
                column: "PlayerModeId",
                principalTable: "Modes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
