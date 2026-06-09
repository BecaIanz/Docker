using IAgro.Domain.Models;
using IAgro.Domain.Objects;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace IAgro.Persistence.Tables;

public static class FieldTableExtensions
{
    private static readonly GeometryFactory GeometryFactory = NetTopologySuite
        .NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

    public static void ConfigureFieldTable(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Field>(entity =>
        {
            entity.ToTable("fields");

            entity.ConfigureBaseTableProps();

            entity.Property(e => e.CompanyId)
                .HasColumnName("company_id")
                .IsRequired();
            entity.HasOne(e => e.Company)
                .WithMany(c => c.Fields)
                .HasForeignKey(e => e.CompanyId);

            entity.Property(e => e.Nickname)
                .HasColumnName("nickname")
                .HasColumnType("varchar(35)")
                .IsRequired();

            entity.Property(e => e.Area)
                .HasColumnName("area")
                .HasColumnType("double precision")
                .IsRequired();

            entity.Property(e => e.Crop)
                .HasColumnName("crop")
                .HasColumnType("varchar(35)")
                .IsRequired();

            entity.Property(e => e.LocationPoints)
                .HasConversion(
                    lps => GeometryFactory.CreateMultiPoint(
                        lps.Select(lp => GeometryFactory.CreatePoint(
                            new Coordinate(lp.Longitude, lp.Latitude)
                        )).ToArray()
                    ),
                    mp => mp.Geometries
                        .OfType<Point>()
                        .Select(p => new LocationPoint(p.Y, p.X))
                        .ToList()
                )
                .HasColumnType("geometry (MultiPoint, 4326)")
                .HasColumnName("location_points")
                .IsRequired();
        });
    }
}