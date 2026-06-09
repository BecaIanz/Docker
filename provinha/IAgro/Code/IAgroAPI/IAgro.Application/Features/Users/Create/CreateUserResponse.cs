using IAgro.Domain.Common.Enums;

namespace IAgro.Application.Features.Users.Create;

public sealed record CreateUserResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    Guid CompanyId,
    UserRole Role,
    string Email
);