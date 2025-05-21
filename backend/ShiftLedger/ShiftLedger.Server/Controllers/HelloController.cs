using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ShiftLedger.Server.Data;

namespace ShiftLedger.Server.Controllers;

[ApiController]
[Route("api")]
public class HelloController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<HelloController> _logger;

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
}