using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.GetAll;

public sealed record GetAllFieldsResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Nickname,
    string Crop,
    double Area,
    List<LocationPoint> LocationPoints
);

