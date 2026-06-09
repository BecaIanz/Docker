namespace IAgro.Domain.Common.Messages;

public static class ExceptionMessages
{
    public static class BadRequest
    {
        public const string Default = "Bad request.";
        public const string Format = "The request was not built correctly or contains invalid fields.";
    }

    public static class Unauthorized
    {
        public const string Default = "Unauthorized.";
        public const string Session = "Invalid user session, you must login first.";
        public const string Token = "Invalid bearer token provided in header.";
        public const string TokenPrefix = "Token must be Bearer type.";
        public const string Credentials = "Credentials do not match or incorrect password.";
    }

    public static class Forbidden
    {
        public const string Default = "Forbidden.";
        public const string Admin = "You dot not own enough permission. You must be an admin to perform this.";
        public const string Role = "You don't have the proper role to perform this action.";
        public const string NotOwnUser = "You must reference a object owned by you to perform this.";
        public const string NotOwnUserNorAdmin = "You must reference a object owned by you or be an admin to perform this.";
    }

    public static class NotFound
    {
        public const string Default = "Not Found.";
        public const string Company = "Company not found.";
        public const string CropDisease = "Cropd disease not found.";
        public const string Device = "Device not found.";
        public const string Field = "Field not found.";
        public const string FieldScan = "Field scan not found.";
        public const string User = "User not found.";
    }

    public static class Conflict
    {
        public const string Default = "Conflict.";
        public const string ResourceState = "The request could not be completed due to a conflict with the current state of the resource.";
    }

    public static class InternalServerError
    {
        public const string Default = "Internal Server Error.";
    }

    public static class NotImplemented
    {
        public const string Default = "Not Implemented.";
    }
}