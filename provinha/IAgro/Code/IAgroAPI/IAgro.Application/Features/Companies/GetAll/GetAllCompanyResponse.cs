namespace IAgro.Application.Features.Companies.GetAll;

public sealed record GetAllCompaniesResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Name,
    string CNPJ,
    string Country
);
