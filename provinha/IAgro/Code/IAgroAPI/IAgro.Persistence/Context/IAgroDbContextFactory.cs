using IAgro.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace IAgro.Persistence.Context;

public class IAgroDbContextFactory : IDesignTimeDbContextFactory<IAgroContext>
{
    public IAgroContext CreateDbContext(string[] args)
    {
        DotEnv.Load();

        var optionsBuilder = new DbContextOptionsBuilder<IAgroContext>();
        
        optionsBuilder.UseNpgsql(DotEnv.Get("DATABASE_URL"),
            o => o.UseNetTopologySuite());

        return new IAgroContext(optionsBuilder.Options);
    }
}