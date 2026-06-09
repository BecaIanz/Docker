using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.GetByCompany;

public sealed record GetFieldByCompanyResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Nickname,
    string Crop,
    double Area,
    List<LocationPoint> LocationPoints
);
