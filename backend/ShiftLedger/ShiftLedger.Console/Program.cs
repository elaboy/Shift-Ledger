using System.Net;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());

var client = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5000")
};

var logger = loggerFactory.CreateLogger("Console");

SanityCheck();

async void SanityCheck()
{
    logger.LogInformation("Testing Server Connection...");
    var response = await client.GetAsync("api/hello-world");
    Console.WriteLine(response);

    if (response.IsSuccessStatusCode)
    {
        logger.LogInformation("Server Connection success.");
    }
    else if (response.StatusCode == HttpStatusCode.NotFound)
    {
        logger.LogError($"Server Connection failed: {response.ReasonPhrase}");
    }

}