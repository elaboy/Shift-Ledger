using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShiftLedger.Core.Models;
using ShiftLedger.Server.Data;

namespace ShiftLedger.Server.Controllers;

[ApiController]
[Route("api")]
public class HelloController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<HelloController> _logger;

    #region dev endpoints

    [HttpPost("backfill-hours-worked")]
    public async Task<IActionResult> BackfillHoursWorked()
    {
        var shifts = await _context.Shifts.ToListAsync();

        foreach (var shift in shifts)
        {
            shift.HoursWorked = (decimal)(shift.EndTime - shift.StartTime).TotalHours;
        }

        await _context.SaveChangesAsync();

        return Ok("Backfill complete");
    }

    #endregion
    public HelloController(ILogger<HelloController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("hello-world")]
    public async Task<ActionResult<string>> GetHelloController()
    {
        _logger.LogInformation("Hello World");
        return Ok("Hello World!");
    }

    [HttpGet("test-db")]
    public async Task<ActionResult<string>> GetTestDbConnection()
    {
        //test connecton to the database 
        _logger.LogInformation("Database Connection Test Started...");

        bool connection = await _context.Database.CanConnectAsync();

        if (connection)
        {
            _logger.LogInformation("Database Connection Success!");
            return Ok("Connection established");
        }

        _logger.LogError("Database Connection Failed...");
        return BadRequest("Connection error");
    }

    [HttpPost("upload-shift")]
    public async Task<ActionResult<string>> UploadShift([FromBody] Shift shift)
    {
        _logger.LogInformation($"Upload Shift Started with shift: {shift}");
        shift.HoursWorked = (decimal)(shift.EndTime - shift.StartTime).TotalHours;
        _context.Shifts.Add(shift);
        await _context.SaveChangesAsync();
        
        return Ok($"Shift Saved to the Database with ID: {shift.Id}");
    }

    [HttpGet("shifts")]
    public async Task<ActionResult<string>> GetShifts()
    {
        _logger.LogInformation("Getting all shifts...");

        var shifts = _context.Shifts.ToList();
        
        return Ok(shifts);
    }

    [HttpGet("date-range")]
    public async Task<IActionResult> GetShiftsByDateRange([FromQuery] DateOnly start, [FromQuery] DateOnly end)
    {
        if (start > end)
            return BadRequest("Start date must be before end date");

        var shifts = await _context.Shifts
            .Where(shift => shift.Date >= start && shift.Date <= end)
            .ToListAsync();
        
        return Ok(shifts);
    }

    [HttpGet("hours-worked")]
    public async Task<IActionResult> GetWorkedHours([FromQuery] decimal hoursWorked)
    {
        if (hoursWorked < 0)
            return BadRequest("Hours worked must be greater than 0");

        var shifts = await _context.Shifts
            .Where(shift => shift.HoursWorked == hoursWorked)
            .ToListAsync();
        
        return Ok(shifts);
    }

    [HttpGet("start-time")]
    public async Task<IActionResult> GetStartTime([FromQuery] TimeSpan startTime)
    {
        if (startTime < TimeSpan.Zero)
            return BadRequest("Start time must be greater than 0");
        
        var shifts = await _context.Shifts
            .Where(shift => shift.StartTime == startTime)
            .ToListAsync();

        return Ok(shifts);
    }

    [HttpGet("end-time")]
    public async Task<IActionResult> GetEndTime([FromQuery] TimeSpan endTime)
    {
        if (endTime < TimeSpan.Zero)
            return BadRequest("End time must be greater than 0");
        
        var shifts = await _context.Shifts
            .Where(shift => shift.EndTime == endTime)
            .ToListAsync();
        
        return Ok(shifts);
    }
}