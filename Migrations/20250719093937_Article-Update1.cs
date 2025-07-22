using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkillLink.Migrations
{
    /// <inheritdoc />
    public partial class ArticleUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Article_ApplicationUser_UserId",
                table: "Article");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Article_ArticlesId",
                table: "ArticleTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Article",
                table: "Article");

            migrationBuilder.RenameTable(
                name: "Article",
                newName: "Articles");

            migrationBuilder.RenameIndex(
                name: "IX_Article_UserId",
                table: "Articles",
                newName: "IX_Articles_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Articles",
                table: "Articles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_ApplicationUser_UserId",
                table: "Articles",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag",
                column: "ArticlesId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_ApplicationUser_UserId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Articles",
                table: "Articles");

            migrationBuilder.RenameTable(
                name: "Articles",
                newName: "Article");

            migrationBuilder.RenameIndex(
                name: "IX_Articles_UserId",
                table: "Article",
                newName: "IX_Article_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Article",
                table: "Article",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Article_ApplicationUser_UserId",
                table: "Article",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Article_ArticlesId",
                table: "ArticleTag",
                column: "ArticlesId",
                principalTable: "Article",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
