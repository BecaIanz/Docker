using MediatR;

namespace IAgro.Application.Features.Users.Delete;

public sealed record DeleteUserRequest(
    Guid Id
) : IRequest<DeleteUserResponse>;