using IAgro.Domain.Common.Enums;
using MediatR;

namespace IAgro.Application.Features.Users.Update;

public sealed record UpdateUserRequest (
    Guid UserId,
    UpdateUserRequestProps Props
) : IRequest<UpdateUserResponse>;

public sealed record UpdateUserRequestProps(
    string Email,
    string Password,
    UserRole Role
);
