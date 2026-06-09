using IAgro.Domain.Objects;
using MediatR;

namespace IAgro.Application.Features.FieldScans.Scan;

public sealed record ScanRequest(
    string DeviceCode, // Changed from Guid DeviceId to string DeviceCode
    Guid FieldId,
    DateTime StartedAt,
    List<CropDiseasesRequest> CropDiseasesFound
) : IRequest<ScanResponse>;

public sealed record CropDiseasesRequest(
    string Disease,
    DateTime DetectedAt,
    LocationPoint LocationPoint
);