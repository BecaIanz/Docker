using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Users.Delete;

public class DeleteUserHandler(
    IUsersRepository usersRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteUserRequest, DeleteUserResponse>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    
    public async Task<DeleteUserResponse> Handle(
        DeleteUserRequest request, CancellationToken cancellationToken)
    {
        var sessionData = requestSession.GetSessionOrThrow();

        if(!sessionData.IsAdmin)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var user = await usersRepository.Get(request.Id, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        usersRepository.Delete(user);

        await unitOfWork.Save(cancellationToken);

        return new DeleteUserResponse();
    }
}