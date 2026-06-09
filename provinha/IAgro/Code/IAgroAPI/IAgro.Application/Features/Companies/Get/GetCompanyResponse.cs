using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Companies.Get;

public sealed record GetCompanyResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    string Name,
    string CNPJ,
    string Country,
    List<Field> Fields,
    List<GetCompanyUserPresenter> Users
);

public record GetCompanyUserPresenter(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    UserRole Role,
    string Email
);