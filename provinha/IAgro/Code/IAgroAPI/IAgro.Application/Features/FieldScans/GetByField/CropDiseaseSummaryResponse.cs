using IAgro.Domain.Objects;
using System;

namespace IAgro.Application.Features.FieldScans.GetByField;

public sealed record CropDiseaseSummaryResponse(
    string Disease,
    DateTime DetectedAt,
    LocationPoint LocationPoint
);
