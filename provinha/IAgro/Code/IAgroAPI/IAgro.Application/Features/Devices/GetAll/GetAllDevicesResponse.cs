namespace IAgro.Application.Features.Devices.GetAll;

public sealed record GetAllDevicesResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string? Nickname,
    string Code,
    Guid? CompanyId
);
