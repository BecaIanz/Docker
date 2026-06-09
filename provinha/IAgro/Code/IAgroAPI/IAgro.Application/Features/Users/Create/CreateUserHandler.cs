using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Contracts;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Users.Create;

public class UpdateUserHandler(
    IUsersRepository usersRepository,
    IPasswordHasher passwordHasher,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<CreateUserRequest, CreateUserResponse>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IPasswordHasher passwordHasher = passwordHasher;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;

    public async Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        var role = session.Role switch
        {
            UserRole.Admin => UserRole.Manager,
            UserRole.Manager => UserRole.Reader, 
            _ => throw new ForbiddenException(ExceptionMessages.Forbidden.Role),
        };

        var user = mapper.Map<User>(request);
        user.Role = role;
        user.Password = passwordHasher.Hash(user);

        usersRepository.Create(user);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<CreateUserResponse>(user);
    }
}
