using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class ForbiddenException(
    string message = ExceptionMessages.Forbidden.Default,
    string? details = null
) : AppException(StatusCode.Forbidden, message, details) { }