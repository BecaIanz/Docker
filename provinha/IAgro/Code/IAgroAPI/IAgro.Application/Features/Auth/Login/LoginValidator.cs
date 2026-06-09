using FluentValidation;

namespace IAgro.Application.Features.Auth.Login;

public class LoginValidator : AbstractValidator<LoginRequest>
{
    public LoginValidator()
    {
        RuleFor(l => l.Email).NotEmpty();
        RuleFor(l => l.Password).NotEmpty();
    }
}