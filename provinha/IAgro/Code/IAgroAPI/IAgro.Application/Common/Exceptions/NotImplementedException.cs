using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class NotImplementedException(
    string message = ExceptionMessages.NotImplemented.Default,
    string? details = null
) : AppException(StatusCode.NotImplemented, message, details) { }