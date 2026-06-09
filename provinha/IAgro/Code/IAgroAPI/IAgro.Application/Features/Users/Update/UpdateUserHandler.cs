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

namespace IAgro.Application.Features.Users.Update;

public class UpdateUserHandler(
    IUsersRepository usersRepository,
    IPasswordHasher passwordHasher,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<UpdateUserRequest, UpdateUserResponse>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IPasswordHasher passwordHasher = passwordHasher;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;

    public async Task<UpdateUserResponse> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
    {

        var foundUser = await usersRepository.Get(request.UserId, cancellationToken)
                    ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        if (request.Props.Email is not null)
            foundUser.Email = request.Props.Email;

        if (request.Props.Password is not null)
            foundUser.Password = passwordHasher.Hash(foundUser);

        foundUser.Role = request.Props.Role;

        usersRepository.Update(foundUser);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<UpdateUserResponse>(foundUser);
    }
}
