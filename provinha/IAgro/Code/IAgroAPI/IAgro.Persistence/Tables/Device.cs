using IAgro.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Tables;

public static class DeviceTableExtensions
{
    public static void ConfigureDeviceTable(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Device>(entity =>
        {
            entity.ToTable("devices");

            entity.ConfigureBaseTableProps();

            entity.Property(e => e.Nickname)
                .HasColumnName("nickname")
                .HasColumnType("varchar(35)");

            entity.Property(e => e.Code)
                .HasColumnName("code")
                .HasColumnType("varchar(128)");

            entity.Property(e => e.CompanyId)
                .HasColumnName("company_id");

            entity.HasOne(e => e.Company)
                .WithMany(c => c.Devices)
                .HasForeignKey(e => e.CompanyId);

        });
    }
}