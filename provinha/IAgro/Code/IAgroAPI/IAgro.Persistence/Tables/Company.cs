using IAgro.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Tables;

public static class CompanyTableExtensions
{
    public static void ConfigureCompanyTable(this ModelBuilder modelBuilder)
        => modelBuilder.Entity<Company>(entity =>
        {
            entity.ToTable("companies");

            entity.ConfigureBaseTableProps();
            
            entity.Property(c => c.Name)
                .HasColumnName("name")
                .HasColumnType("varchar(35)")
                .IsRequired();
            entity.HasIndex(c => c.Name)
                .IsUnique();

            entity.Property(c => c.CNPJ)
                .HasColumnName("cnpj")
                .HasColumnType("varchar(14)")
                .IsRequired();
            entity.HasIndex(c => c.CNPJ)
                .IsUnique();
            
            entity.Property(c => c.Country)
                .HasColumnName("country")
                .HasColumnType("varchar(35)")
                .IsRequired();
        });
}
