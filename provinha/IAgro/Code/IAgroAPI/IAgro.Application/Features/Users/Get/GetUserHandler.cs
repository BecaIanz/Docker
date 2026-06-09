using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Users.Get;

public class GetUserHandler(
    IUsersRepository usersRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetUserRequest, GetUserResponse>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<GetUserResponse> Handle(GetUserRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        if (session.Role == UserRole.Reader && session.UserId != request.UserId)
            throw new ForbiddenException(ExceptionMessages.Forbidden.NotOwnUserNorAdmin);

        var user = await usersRepository.Get(request.UserId, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.User);

        return mapper.Map<GetUserResponse>(user);
    }
}