namespace Panetone;

public record Result<T>(
    T Data,
    bool isSuccess,
    string Reason
)
{
    public static Result<T> Success(T data)
    => new(data, true, string.Empty);

    public static Result<T> Fail(string reason)
    => new(default!, false, reason);
}