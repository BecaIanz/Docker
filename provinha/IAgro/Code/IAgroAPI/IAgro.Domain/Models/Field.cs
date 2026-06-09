using IAgro.Domain.Objects;

namespace IAgro.Domain.Models;

public class Field : BaseModel
{
    public required Guid CompanyId { get; set; }
    public required Company Company { get; set; }

    public required string Nickname { get; set; }
    public required double Area { get; set; }
    public required string Crop { get; set; }

    public List<LocationPoint> LocationPoints { get; set; } = [];
    public List<FieldScan> FieldScans { get; } = [];
}