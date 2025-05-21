using System.Net;
using Microsoft.Extensions.Logging;

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

// Console.Clear();

logger.LogInformation("Service check succeeded...");

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