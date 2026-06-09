using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Users.GetAll;

public sealed record GetAllUsersResponse(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? DeletedAt,
    Company Company,
    UserRole Role,
    string Email
);