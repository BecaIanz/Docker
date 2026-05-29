class Program
{
    static async Task Main()
    {
        using HttpClient client = new();

        while (true)
        {
            using HttpResponseMessage res = await client.GetAsync("http://maestro:80/api");
            
            string content = await res.Content.ReadAsStringAsync();

            Console.WriteLine(content);
            
            Thread.Sleep(1000);
        }
    }
}
