using IAgro.Domain.Objects;

namespace IAgro.Domain.Models;

public class CropDisease : BaseModel
{
    public required Guid FieldScanId { get; set; }
    public required FieldScan FieldScan { get; set; }

    public required string Disease { get; set; }
    public required DateTime DetectedAt { get; set; }
    public required LocationPoint LocationPoint { get; set; }
}