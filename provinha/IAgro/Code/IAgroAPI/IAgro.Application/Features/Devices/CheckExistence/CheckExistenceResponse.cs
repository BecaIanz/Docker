namespace IAgro.Application.Features.Devices.CheckExistence;

public sealed record CheckExisteneceResponse
(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Code,
    Guid? CompanyId
);