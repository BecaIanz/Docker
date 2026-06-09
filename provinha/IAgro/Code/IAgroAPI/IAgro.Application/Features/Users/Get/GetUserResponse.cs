using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Users.Get;

public sealed record GetUserResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    Company Company,
    UserRole Role,
    string Email
);