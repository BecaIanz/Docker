using IAgro.Domain.Models;
using System;
using System.Collections.Generic;

namespace IAgro.Application.Features.FieldScans.GetByField;

public sealed record FieldScanSummaryResponse(
    Guid FieldId,
    List<CropDiseaseSummaryResponse> CropDiseasesFound
);
