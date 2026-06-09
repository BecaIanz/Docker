namespace IAgro.Application.Features.Companies.Create;

public sealed record CreateCompanyResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Name,
    string CNPJ,
    string Country
);