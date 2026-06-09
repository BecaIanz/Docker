using IAgro.Application.Common.Exceptions;
using IAgro.Application.Contracts;
using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Auth.Login;

public class LoginHandler(
    IUsersRepository usersRepository,
    IPasswordHasher passwordHasher,
    IAuthenticator authenticator
) : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly IUsersRepository usersRepository = usersRepository;
    private readonly IPasswordHasher passwordHasher = passwordHasher;
    private readonly IAuthenticator authenticator = authenticator;

    public async Task<LoginResponse> Handle(
        LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await usersRepository.GetByEmail(request.Email, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.User);

        if (!passwordHasher.Matches(user, request.Password))
            throw new UnauthorizedException(ExceptionMessages.Unauthorized.Credentials);

        var token = authenticator.GenerateUserToken(user);

        return new LoginResponse(token);
    }
}