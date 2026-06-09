using MediatR;

namespace IAgro.Application.Features.Users.Create;

public sealed record CreateUserRequest(
    Guid CompanyId,
    string Email,
    string Password
) : IRequest<CreateUserResponse>;