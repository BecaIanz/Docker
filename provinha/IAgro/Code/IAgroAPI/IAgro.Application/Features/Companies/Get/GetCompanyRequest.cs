namespace IAgro.Application.Features.Companies.Get;
using MediatR;

public sealed record GetCompanyRequest(
    Guid Id
) : IRequest<GetCompanyResponse>;