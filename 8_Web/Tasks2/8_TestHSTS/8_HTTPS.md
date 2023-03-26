# HTTPS
## Answers

1. Whats precentage of tested sites have the HSTS header set?
    - around 50%  (I made the mistake to let my pc go in sleep mode so I only tested around 350 sites..)
        - some requests resulted in failure (around 6%) so there is an error margin
        - some results might be flawed 
2. Your program code
    - see pdf or relevant snipped below (.Net 7 code)
3. How many websites could you test? How could you further improve the speed of your program?
    - run requests in parallel using multiple threats. Easily possible as order is not important
4. Did you make any special overservations?
    - Some top sites dont use HSTS according to my requests but when testing in a browser they do
        - examples: https://google.com or baidu.com  (both search enginges...)
            -  strict-transport-security: max-age=31536000
    - some requests are blocked by company networks (no surprise given the urls )
    - it seems to me the further down in the list of top sites, the less likely they are to use HSTS
        - from the top sites only bilibilib.com doesnt use HSTS


Program code (C# .Net 7)
```
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
```


## Notes/varia
HTTPS: HTTP Strict Transport Security is a web security policy mechanism that helps to protect websites against man-in-the-middle attacks such as protocol downgrade attacks.
