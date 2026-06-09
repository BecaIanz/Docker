namespace IAgro.Application.Features.Devices.CreateConnection;

public sealed record CreateConnectionResponse
(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string? Nickname,
    string Code,
    Guid? CompanyId
);