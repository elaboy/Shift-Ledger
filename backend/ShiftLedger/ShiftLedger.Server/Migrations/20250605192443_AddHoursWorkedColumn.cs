using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftLedger.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddHoursWorkedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "HoursWorked",
                table: "Shifts",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursWorked",
                table: "Shifts");
        }
    }
}
