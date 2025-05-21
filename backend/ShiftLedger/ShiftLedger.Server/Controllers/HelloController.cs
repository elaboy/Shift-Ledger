using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ShiftLedger.Server.Controllers;

[ApiController]
[Route("api")]
public class HelloController : ControllerBase
{
    [HttpGet("hello-world")]
    public async Task<ActionResult<string>> GetHelloController()
    {
        return Ok("Hello World!");
    }

    [HttpGet("Test-Db-Connection")]
    public async Task<ActionResult<string>> GetTestDbConnection()
    {
        return Ok("Hello World!"); //todo this is a place holder
    }
}