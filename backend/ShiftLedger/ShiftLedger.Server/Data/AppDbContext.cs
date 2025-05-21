using Microsoft.EntityFrameworkCore;
using ShiftLedger.Core.Models;

namespace ShiftLedger.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Shift> Shifts { get; set; }
    public DbSet<Payment> Transactions { get; set; }
}