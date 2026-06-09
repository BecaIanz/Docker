using IAgro.Domain.Models;

namespace IAgro.Application.Contracts;

public interface IPasswordHasher
{
    string Hash(User user);
    bool Matches(User user, string password);
}