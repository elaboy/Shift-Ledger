namespace ShiftLedger.Core.Models;

public class Payment
{
    public int Id { get; set; }
    public required Shift Shift { get; set; }
    public decimal Cash { get; set; }
    public decimal Card { get; set; }
    public decimal TipOut { get; set; }
    public decimal Bonuses { get; set; }
    public string? Notes { get; set; }
}