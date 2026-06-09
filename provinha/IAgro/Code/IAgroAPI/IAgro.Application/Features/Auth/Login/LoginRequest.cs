using MediatR;

namespace IAgro.Application.Features.Auth.Login;

public sealed record LoginRequest(
    string Email,
    string Password
) : IRequest<LoginResponse>;