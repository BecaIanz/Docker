using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class InternalServerErrorException(
    string message = ExceptionMessages.InternalServerError.Default,
    string? details = null
) : AppException(StatusCode.InternalServerError, message, details) { }