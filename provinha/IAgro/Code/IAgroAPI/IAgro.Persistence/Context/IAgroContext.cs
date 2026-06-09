using IAgro.Persistence.Tables;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Context;

public class IAgroContext(DbContextOptions<IAgroContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ConfigureCompanyTable();
        modelBuilder.ConfigureCropDiseaseTable();
        modelBuilder.ConfigureDeviceTable();
        modelBuilder.ConfigureFieldScanTable();
        modelBuilder.ConfigureFieldTable();
        modelBuilder.ConfigureUserTable();
    }
}