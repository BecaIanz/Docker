using IAgro.Domain.Models;
using IAgro.Domain.Objects;

namespace IAgro.Application.Contracts;

public interface IAuthenticator {
    string GenerateUserToken(User user);
    SessionData ExtractToken(string token);
}