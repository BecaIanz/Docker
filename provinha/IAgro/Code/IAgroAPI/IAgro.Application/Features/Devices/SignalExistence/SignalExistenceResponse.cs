namespace IAgro.Application.Features.Devices.SignalExistence;

public sealed record SignalExistenceResponse
(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string? Nickname,
    string Code,
    Guid? CompanyId
);