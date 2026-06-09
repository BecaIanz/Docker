using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IAgro.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StartedAtFieldScan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "started_at",
                table: "field_scans",
                type: "timestamptz",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "started_at",
                table: "field_scans");
        }
    }
}
