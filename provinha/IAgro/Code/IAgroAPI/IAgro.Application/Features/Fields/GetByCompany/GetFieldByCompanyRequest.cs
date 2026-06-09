namespace IAgro.Application.Features.Fields.GetByCompany;

using IAgro.Application.Features.Fields.Get;
using MediatR;

public sealed record GetFieldByCompanyRequest(
    Guid Id
) : IRequest<List<GetFieldByCompanyResponse>>;