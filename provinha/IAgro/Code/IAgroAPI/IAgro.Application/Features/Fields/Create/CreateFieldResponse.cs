using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.Create;

public sealed record CreateFieldResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Nickname,
    string Crop,
    double Area,
    List<LocationPoint> LocationPoints
);