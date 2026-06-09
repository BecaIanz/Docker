using IAgro.API.Enums;
using IAgro.Application.Features.Devices.CheckExistence;
using IAgro.Application.Features.Devices.CreateConnection;
using IAgro.Application.Features.Devices.DeleteConnection;
using IAgro.Application.Features.Devices.GetAll;
using IAgro.Application.Features.Devices.GetByCompany;
using IAgro.Application.Features.Devices.SignalExistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IAgro.API.Controllers;

[ApiController]
[Route(APIRoutes.Devices)]
public class DeviceController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    [HttpGet, Route("{deviceCode}")]
    public async Task<ActionResult<CheckExisteneceResponse>> CheckExistence(
        [FromRoute] string deviceCode,
        CancellationToken cancellationToken)
    {
        var request = new CheckExistenceRequest(deviceCode);
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost, Route("signal")]
    public async Task<ActionResult<SignalExistenceResponse>> SignalExistence(
        SignalExistenceRequest request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Created(APIRoutes.Devices, response);
    }

    [HttpPost, Route("connect")]
    public async Task<ActionResult<CreateConnectionResponse>> CreateConnection(
        CreateConnectionRequest request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Created(APIRoutes.Devices, response);
    }

    [HttpGet]
    public async Task<ActionResult<GetAllDevicesResponse>> GetAll(
        CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetAllDevicesRequest(), cancellationToken);
        return Ok(response);
    }

    [HttpGet, Route("company/{companyId}")]
    public async Task<ActionResult<GetByCompanyResponse>> GetByCompany(
        [FromRoute] Guid companyId,
        CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetByCompanyRequest(companyId), cancellationToken);
        return Ok(response);
    }

    [HttpDelete, Route("disconnect")]
    public async Task<ActionResult<DeleteConnectionResponse>> GetAll(
        DeleteConnectionRequest request,
        CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    
}