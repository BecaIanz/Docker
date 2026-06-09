using AutoMapper;
using MediatR;
using IAgro.Application.Common.Session;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Common.Messages;
using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Enums;

namespace IAgro.Application.Features.Users.GetAll;

public class GetAllUsersHandler(
    IUsersRepository usersRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetAllUsersRequest, List<GetAllUsersResponse>>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<List<GetAllUsersResponse>> Handle(
        GetAllUsersRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        var users = session.Role switch
        {
            UserRole.Manager => await usersRepository.GetByCompany(session.UserCompanyId, cancellationToken),
            UserRole.Admin => await usersRepository.GetManagers(cancellationToken),
            _ => [(await usersRepository.Get(session.UserId, cancellationToken))!],
        };

        return mapper.Map<List<GetAllUsersResponse>>(users);
    }
}