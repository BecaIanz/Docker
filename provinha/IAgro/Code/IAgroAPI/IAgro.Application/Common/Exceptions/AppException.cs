using IAgro.Domain.Common.Enums;

namespace IAgro.Application.Common.Exceptions;

public class AppException(
    StatusCode statusCode,
    string message,
    string? details = null
) : Exception(message)
{
    public StatusCode StatusCode { get; } = statusCode;
    public string? Details { get; } = details;
}
