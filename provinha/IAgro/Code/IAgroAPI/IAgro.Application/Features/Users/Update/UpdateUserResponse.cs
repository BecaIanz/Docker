using IAgro.Domain.Common.Enums;

namespace IAgro.Application.Features.Users.Update;

public sealed record UpdateUserResponse
(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    Guid CompanyId,
    UserRole Role,
    string Email
);