using IAgro.API.Enums;
using IAgro.Application.Features.Companies.Create;
using IAgro.Application.Features.Companies.Delete;
using IAgro.Application.Features.Companies.Get;
using IAgro.Application.Features.Companies.GetAll;
using IAgro.Application.Features.Companies.Insights;
using IAgro.Application.Features.Companies.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IAgro.API.Controllers;

[ApiController]
[Route(APIRoutes.Companies)]
public class CompaniesController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    [HttpGet, Route("{companyId}/insights")]
    public async Task<ActionResult<CompanyInsightsResponse>> Insights(
        [FromRoute] Guid companyId, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new CompanyInsightsRequest(companyId), cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<CreateCompanyResponse>> Create(
        CreateCompanyRequest request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Created(APIRoutes.Companies, response);
    }

    [HttpPut, Route("{companyId}")]
    public async Task<ActionResult<UpdateCompanyResponse>> Update(
        [FromRoute] Guid companyId,
        UpdateCompanyRequestProps props,
        CancellationToken cancellationToken
    )
    {
        var request = new UpdateCompanyRequest(companyId, props);
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpDelete, Route("{companyId}")]
    public async Task<ActionResult<DeleteCompanyResponse>> Delete(
        [FromRoute] Guid companyId, CancellationToken cancellationToken
    )
    {
        var request = new DeleteCompanyRequest(companyId);
        await mediator.Send(request, cancellationToken);
        return NoContent();
    }

    [HttpGet, Route("{companyId}")]
    public async Task<ActionResult<GetCompanyResponse>> Get(
        [FromRoute] Guid companyId, CancellationToken cancellationToken)
    {
        var request = new GetCompanyRequest(companyId);
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<GetAllCompaniesResponse>> GetAll(
        CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetAllCompaniesRequest(), cancellationToken);
        return Ok(response);
    }
}