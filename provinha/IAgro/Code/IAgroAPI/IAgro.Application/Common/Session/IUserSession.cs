using IAgro.Domain.Objects;

namespace IAgro.Application.Common.Session;

public interface IRequestSession
{
    SessionData GetSessionOrThrow();
    void SetSession(SessionData? sessionData);
}