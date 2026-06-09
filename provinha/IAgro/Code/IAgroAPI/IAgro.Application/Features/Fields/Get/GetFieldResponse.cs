using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.Get;

public sealed record GetFieldResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Nickname,
    string Crop,
    double Area,
    List<LocationPoint> LocationPoints
);
