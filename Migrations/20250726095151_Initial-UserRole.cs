using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SkillLink.Migrations
{
    /// <inheritdoc />
    public partial class InitialUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5c83c52e-9426-46a3-b5b2-a6a591ca39f1", "5c83c52e-9426-46a3-b5b2-a6a591ca39f1", "Admin", "ADMIN" },
                    { "cda8ec06-af61-4627-8c82-3b3de4ac1ae0", "cda8ec06-af61-4627-8c82-3b3de4ac1ae0", "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c83c52e-9426-46a3-b5b2-a6a591ca39f1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cda8ec06-af61-4627-8c82-3b3de4ac1ae0");
        }
    }
}
