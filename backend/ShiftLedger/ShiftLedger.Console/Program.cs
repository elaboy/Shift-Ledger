using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Logging;
using ShiftLedger.Core.Models;

using ILoggerFactory loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());

var client = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5000")
};

var logger = loggerFactory.CreateLogger("Console Application");


if (await ServiceCheck() == 0)
{
    logger.LogError("Service check failed...");
    return 0;
}

logger.LogInformation("Service check succeeded...");

Console.Clear();

PromptUser();

string? userResponse = Console.ReadLine();

bool parseUserResponse = int.TryParse(userResponse, out int userAction);

if (userAction == 1)
{
    //new shift
    Console.WriteLine("Date (yyyy-mm-dd): ");
    string shiftDate = Console.ReadLine() ?? string.Empty;

    Console.WriteLine("Start Time (HH:mm): ");
    string startTime = Console.ReadLine() ?? string.Empty;

    Console.WriteLine("End Time (HH:mm): ");
    string endTime = Console.ReadLine() ?? string.Empty;

    var shift = new Shift
    {
        Date = DateTime.Parse(shiftDate),
        StartTime = TimeSpan.Parse(startTime),
        EndTime = TimeSpan.Parse(endTime),
    };

    shift.Date = DateTime.SpecifyKind(shift.Date, DateTimeKind.Utc);

    var response = await client.PostAsJsonAsync("api/upload-shift", shift);

    if (response.IsSuccessStatusCode)
    {
        Console.WriteLine("Shift Upload Complete!");
    }
}
else if (userAction == 2)
{
    // view a shift
}
else if (userAction == 3)
{
    Console.WriteLine("Getting all shifts...");
    //view all shifts
    var response = await client.GetAsync("api/shifts");

    if (response.IsSuccessStatusCode)
    {
        var shifts = await response.Content.ReadFromJsonAsync<List<Shift>>();

        if (shifts != null)
        {
            if (shifts.Count > 0)
            {
                shifts = shifts.OrderBy(s => s.Date).ToList();
                
                Console.WriteLine("Your Shifts are:\n");
                foreach (var shift in shifts)
                {
                    Console.WriteLine($"Date: {shift.Date}");
                    Console.WriteLine($"Start: {shift.StartTime}");
                    Console.WriteLine($"End: {shift.EndTime}");
                    Console.WriteLine("--------------------");
                }
            }
            else
            {
                Console.WriteLine("You have no shifts recorded.");
            }
        }
    }
}
else if (userAction == 4)
{
    //delete a shift
}

void PromptUser()
{
    Console.WriteLine(@"
Press 1 to upload a new shift
Press 2 to view a shift
Press 3 to view all shifts
Press 3 to delete a shift

Then press the Enter key
");
}

async Task<int> ServiceCheck()
{
    logger.LogInformation("Testing Server Connection...");
    var serverResponse = await client.GetAsync("api/hello-world");

    if (serverResponse.StatusCode == HttpStatusCode.OK)
    {
        logger.LogInformation("Server Connection success.");
    }
    else if (serverResponse.StatusCode == HttpStatusCode.NotFound)
    {
        logger.LogError($"Server Connection failed: {serverResponse.ReasonPhrase}");
        return 0;
    }

    logger.LogInformation("Testing Database Connection...");
    var dbResponse = await client.GetAsync("api/test-db");

    if (dbResponse.StatusCode == HttpStatusCode.OK)
    {
        logger.LogInformation("Database Connection success.");
    }
    else if (dbResponse.StatusCode == HttpStatusCode.BadRequest)
    {
        logger.LogError($"Database Connection failed: {dbResponse.ReasonPhrase}");
        return 0;
    }
    else if (dbResponse.StatusCode == HttpStatusCode.InternalServerError)
    {
        logger.LogError($"Database Connection failed: {dbResponse.ReasonPhrase}");
        return 0;
    }

    return 1;
}

return 1;