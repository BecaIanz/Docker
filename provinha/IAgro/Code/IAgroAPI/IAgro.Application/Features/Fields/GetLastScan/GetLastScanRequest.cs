namespace IAgro.Application.Features.Fields.GetLastScan;
using MediatR;

public sealed record GetLastScanRequest(
    Guid Id
) : IRequest<List<GetLastScanResponse>>;