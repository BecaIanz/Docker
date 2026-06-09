using IAgro.Application.Features.Fields.Get;
using IAgro.Domain.Models;
using IAgro.Domain.Objects;

namespace IAgro.Application.Features.Fields.GetLastScan;

public sealed record GetLastScanResponse(
    GetFieldResponse Field,
    DateTime? LastScan
);
