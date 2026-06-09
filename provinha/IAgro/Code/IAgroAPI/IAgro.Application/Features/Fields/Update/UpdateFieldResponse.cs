using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.Update;

public sealed record UpdateFieldResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Nickname,
    string Crop,
    double Area,
    List<LocationPoint> LocationPoints
);