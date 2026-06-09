using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Objects;

namespace IAgro.API.Security;

public class RequestSession : IRequestSession
{
    private SessionData? SessionData { get; set; }

    public SessionData GetSessionOrThrow()
        => SessionData ?? throw new UnauthorizedException(
            ExceptionMessages.Unauthorized.Session);

    public void SetSession(SessionData? sessionData)
        => SessionData = sessionData;
}
