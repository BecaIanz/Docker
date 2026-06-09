using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.Application.Common.Exceptions;

public class BadRequestException(
    string message = ExceptionMessages.BadRequest.Default,
    string? details = null
) : AppException(StatusCode.BadRequest, message, details) { }