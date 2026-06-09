using MediatR;

namespace IAgro.Application.Features.Users.Get;

public sealed record GetUserRequest(
    Guid UserId
) : IRequest<GetUserResponse>;