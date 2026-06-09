namespace IAgro.Domain.Models;

public class FieldScan : BaseModel
{
    public required Guid FieldId;
    public required Field Field;
    public DateTime StartedAt;
    public List<CropDisease> CropDiseases { get; } = [];
    
    public required Guid DeviceId;
    public required Device Device;
}