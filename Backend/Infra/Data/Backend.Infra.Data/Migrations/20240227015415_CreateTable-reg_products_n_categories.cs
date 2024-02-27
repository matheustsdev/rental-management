using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    public partial class CreateTablereg_products_n_categories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "rent");

            migrationBuilder.Sql(@"
                CREATE SCHEMA IF NOT EXISTS rent;
                SET search_path TO rent;
                CREATE EXTENSION IF NOT EXISTS ""uuid-ossp"";
            ");

            migrationBuilder.CreateTable(
                name: "reg_categories",
                schema: "rent",
                columns: table => new
                {
                    id_category = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "(uuid_generate_v4())"),
                    Name = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "(now() at time zone 'utc')"),
                    updated_at = table.Column<DateTime>(type: "timestamp", nullable: true),
                    deleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    deleted_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reg_categories", x => x.id_category);
                });

            migrationBuilder.CreateTable(
                name: "reg_products",
                schema: "rent",
                columns: table => new
                {
                    id_product = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "(uuid_generate_v4())"),
                    reference = table.Column<string>(type: "varchar(100)", nullable: false),
                    description = table.Column<string>(type: "varchar(1000)", nullable: false),
                    receipt_description = table.Column<string>(type: "varchar(500)", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    price = table.Column<decimal>(type: "decimal", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "(now() at time zone 'utc')"),
                    updated_at = table.Column<DateTime>(type: "timestamp", nullable: true),
                    deleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    deleted_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reg_products", x => x.id_product);
                    table.ForeignKey(
                        name: "FK_reg_products_reg_categories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "rent",
                        principalTable: "reg_categories",
                        principalColumn: "id_category",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_reg_products_CategoryId",
                schema: "rent",
                table: "reg_products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_reg_products_reference",
                schema: "rent",
                table: "reg_products",
                column: "reference",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reg_products",
                schema: "rent");

            migrationBuilder.DropTable(
                name: "reg_categories",
                schema: "rent");

            migrationBuilder.Sql(@"
                SET search_path TO rent;
                DROP EXTENSION IF EXISTS ""uuid-ossp"";
                SET search_path TO public;
                DROP SCHEMA IF EXISTS rent CASCADE;
            ");
        }
    }
}
