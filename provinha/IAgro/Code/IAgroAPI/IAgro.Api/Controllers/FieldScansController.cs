using IAgro.API.Enums;
using IAgro.Application.Features.FieldScans.Scan;
using IAgro.Application.Features.FieldScans.GetByField;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IAgro.API.Controllers;

[ApiController]
[Route(APIRoutes.FieldScans)]
public class FieldScanController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    [HttpPost]
    public async Task<ActionResult<ScanResponse>> Scan(
        ScanRequest request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Created(APIRoutes.Fields, response);
    }

    [HttpGet("by-field/{fieldId}")]
    public async Task<ActionResult<List<FieldScanSummaryResponse>>> GetByField(Guid fieldId, CancellationToken cancellationToken)
    {
        var scans = await mediator.Send(new GetFieldScansByFieldRequest(fieldId), cancellationToken);
        var responses = scans.Select(scan => new FieldScanSummaryResponse(
            scan.FieldId,
            scan.CropDiseases.Select(cd => new CropDiseaseSummaryResponse(
                cd.Disease,
                cd.DetectedAt,
                cd.LocationPoint
            )).ToList()
        )).ToList();
        return Ok(responses);
    }
}