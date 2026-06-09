using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class NotFoundException(
    string message = ExceptionMessages.NotFound.Default,
    string? details = null
) : AppException(StatusCode.NotFound, message, details) { }