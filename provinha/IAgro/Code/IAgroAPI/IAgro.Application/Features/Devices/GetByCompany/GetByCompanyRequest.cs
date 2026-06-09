namespace IAgro.Application.Features.Devices.GetByCompany;
using MediatR;

public sealed record GetByCompanyRequest(
    Guid CompanyId
) 
    : IRequest<List<GetByCompanyResponse>>;