namespace IAgro.Domain.Models;

public class Device : BaseModel
{
    public Guid? CompanyId { get; set; }

    public Company? Company { get; set; }

    public string? Nickname { get; set; }

    public required string Code { get; set; }

    public List<FieldScan> FieldScans { get; set; } = [];

}