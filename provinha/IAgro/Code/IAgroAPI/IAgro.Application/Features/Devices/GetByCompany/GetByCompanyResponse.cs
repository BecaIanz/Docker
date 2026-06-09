namespace IAgro.Application.Features.Devices.GetByCompany;

public sealed record GetByCompanyResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string? Nickname,
    string Code,
    Guid CompanyId
);
