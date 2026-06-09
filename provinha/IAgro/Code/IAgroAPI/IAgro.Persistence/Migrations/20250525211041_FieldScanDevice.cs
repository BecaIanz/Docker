using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IAgro.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FieldScanDevice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "device_id",
                table: "field_scans",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_field_scans_device_id",
                table: "field_scans",
                column: "device_id");

            migrationBuilder.AddForeignKey(
                name: "FK_field_scans_devices_device_id",
                table: "field_scans",
                column: "device_id",
                principalTable: "devices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_field_scans_devices_device_id",
                table: "field_scans");

            migrationBuilder.DropIndex(
                name: "IX_field_scans_device_id",
                table: "field_scans");

            migrationBuilder.DropColumn(
                name: "device_id",
                table: "field_scans");
        }
    }
}
