using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class UnauthorizedException(
    string message = ExceptionMessages.Unauthorized.Default,
    string? details = null
) : AppException(StatusCode.Unauthorized, message, details) { }