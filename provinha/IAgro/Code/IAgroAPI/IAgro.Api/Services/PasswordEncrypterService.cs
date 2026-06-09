using Microsoft.AspNetCore.Identity;
using IAgro.Domain.Models;
using IAgro.Application.Contracts;

namespace IAgro.API.Services;

public class PasswordEncrypterService : IPasswordHasher
{
    private readonly PasswordHasher<User> hasher = new();

    public string Hash(User user)
        => hasher.HashPassword(user, user.Password);
    

    public bool Matches(User user, string password)
    {
        var result = hasher.VerifyHashedPassword(user, user.Password, password);
        return result == PasswordVerificationResult.Success;
    }
}