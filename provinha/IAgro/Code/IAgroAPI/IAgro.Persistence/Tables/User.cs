using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Tables;

public static class UserTableExtensions
{
    public static void ConfigureUserTable(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.ConfigureBaseTableProps();

            entity.Property(e => e.CompanyId)
                .HasColumnName("company_id")
                .IsRequired();
            entity.HasOne(e => e.Company)
                .WithMany(c => c.Users)
                .HasForeignKey(e => e.CompanyId);
            entity.Navigation(u => u.Company).AutoInclude();

            entity.Property(e => e.Email)
                .HasColumnName("email")
                .HasColumnType("varchar(255)")
                .IsRequired();
            entity.HasIndex(e => e.Email)
                .IsUnique();

            entity.Property(e => e.Password)
                .HasColumnName("password")
                .HasColumnType("varchar(255)")
                .IsRequired();

            entity.Property(e => e.Role)
                .HasColumnName("role")
                .HasColumnType("smallint")
                .HasDefaultValue(UserRole.Reader);
        });
    }
}