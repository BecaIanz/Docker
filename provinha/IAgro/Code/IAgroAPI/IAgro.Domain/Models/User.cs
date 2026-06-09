using IAgro.Domain.Common.Enums;

namespace IAgro.Domain.Models;

public class User : BaseModel
{
    public required Guid CompanyId { get; set; }
    public required Company Company { get; set; }

    public required string Email;
    public required string Name;
    public required string Password;
    public required UserRole Role;
}