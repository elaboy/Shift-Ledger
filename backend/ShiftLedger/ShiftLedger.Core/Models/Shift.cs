using System.ComponentModel.DataAnnotations;

namespace ShiftLedger.Core.Models;

public class Shift
{
    [Key]
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal HoursWorked { get; set; }
}