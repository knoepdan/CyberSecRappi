using System.Diagnostics.Metrics;
using System.Net.Http;
using System.Reflection;

namespace TestHSTS
{
    internal class Program
    {
        internal static readonly HttpClient _httpClient = new HttpClient();

        internal static int counter = 0;
        internal static int hstsCounter = 0;
        internal static int failedCounter = 0;

        static async Task Main(string[] args)
        {
            int max = int.MaxValue;
            string csvFile = "C:\\Temp\\topWebs\\top-1m.csv";
            if (args.Length > 0)
            {
                csvFile = args[0];
                if (args.Length > 1 && int.TryParse(args[1], out int tmpMax))
                {
                    max = tmpMax;
                }

            }

            string[] lines = File.ReadAllLines(csvFile);
            if (max < lines.Length)
            {
                lines = lines.Take(max).ToArray();
            }

            await ReadLines(lines);

            float perc = (float)100 / (float)counter * (float)hstsCounter;
            Console.WriteLine($"Total: {counter},  with HSTS: {hstsCounter},  Percentact : {perc}%,  failures: {failedCounter}");
        }

        private static async Task ReadLines(string[] lines)
        {
            for (int i = 0; i < lines.Length; i++)
            {
                try
                {
                    string line = lines[i];
                    string[] noAndUrl = line.Split(",", StringSplitOptions.RemoveEmptyEntries);
                    if (noAndUrl.Length > 1)
                    {
                        string url = "https://" + noAndUrl[1];
                        HttpResponseMessage response = await _httpClient.GetAsync(url);
                        counter++;
                        AnalyzeResponse(response, url);
                    }
                }catch(Exception ex)
                {
                    failedCounter++;
                    Console.WriteLine("########## Error has occured ########### ");
                    Console.WriteLine(lines[i]);
                    Console.WriteLine(ex.Message);
                    Console.WriteLine("#####################");
                }
            }
        }

        private static void AnalyzeResponse(HttpResponseMessage response, string url)
        {
            bool hasHsts = false;
            KeyValuePair<string, IEnumerable<string>> hstsHeader = response.Headers.FirstOrDefault(h => h.Key.Equals("Strict-Transport-Security", StringComparison.InvariantCultureIgnoreCase));
            {
                if (!string.IsNullOrEmpty(hstsHeader.Key) && hstsHeader.Value != null && hstsHeader.Value.Any(x => !string.IsNullOrWhiteSpace(x)))
                {
                    hasHsts = true;
                    hstsCounter++;
                }
                float perc = (float)100 / (float)counter * (float)hstsCounter;
                Console.WriteLine($"{url}  HSTS:  {hasHsts}  |    {counter},  with HSTS: {hstsCounter},  Percentact : {perc}%,  failures: {failedCounter}");
            }
        }
    }
}