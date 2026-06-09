using IAgro.Domain.Models;
using IAgro.Domain.Objects;

namespace IAgro.Application.Features.FieldScans.Scan;

public sealed record ScanResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    DateTime StartedAt,
    string DeviceCode, // Changed from Guid DeviceId to string DeviceCode
    Guid FieldId,
    List<CropDisease> CropDiseasesFound
);