using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkillLink.Migrations
{
    /// <inheritdoc />
    public partial class addCategoryarticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "categoryId",
                table: "Articles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Articles_categoryId",
                table: "Articles",
                column: "categoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Categories_categoryId",
                table: "Articles",
                column: "categoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Categories_categoryId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_categoryId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "categoryId",
                table: "Articles");
        }
    }
}
