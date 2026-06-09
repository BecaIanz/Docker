using IAgro.Domain.Models;
using IAgro.Domain.Objects;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace IAgro.Persistence.Tables;

public static class CropDiseaseTableExtensions
{
    private static readonly GeometryFactory GeometryFactory = NetTopologySuite
        .NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

    public static void ConfigureCropDiseaseTable(this ModelBuilder modelBuilder)
        => modelBuilder.Entity<CropDisease>(entity =>
        {
            entity.ToTable("crop_diseases");

            entity.ConfigureBaseTableProps();

            entity.Property(e => e.FieldScanId)
                .HasColumnName("field_scan_id")
                .IsRequired();
            entity.HasOne(e => e.FieldScan)
                .WithMany(fs => fs.CropDiseases)
                .HasForeignKey(e => e.FieldScanId);

            entity.Property(e => e.Disease)
                .HasColumnName("disease")
                .HasColumnType("varchar(255)")
                .IsRequired();

            entity.Property(e => e.DetectedAt)
                .HasColumnName("detected_at")
                .HasColumnType("timestamptz")
                .IsRequired();

            entity.Property(e => e.LocationPoint)
                .HasConversion(
                    location => GeometryFactory.CreatePoint(new Coordinate(location.Longitude, location.Latitude)),
                    point => new LocationPoint(point.Y, point.X)
                )
                .HasColumnType("geometry (Point, 4326)")
                .HasColumnName("location_point")
                .IsRequired();
        });
}