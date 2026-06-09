using MediatR;

namespace IAgro.Application.Features.Companies.Delete;

public sealed record DeleteCompanyRequest(
    Guid Id
) : IRequest<DeleteCompanyResponse>;