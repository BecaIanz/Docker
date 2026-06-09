using MediatR;

namespace IAgro.Application.Features.Companies.Update;

public sealed record UpdateCompanyRequest(
    Guid CompanyId,
    UpdateCompanyRequestProps Props
) : IRequest<UpdateCompanyResponse>;

public sealed record UpdateCompanyRequestProps(
    string Name,
    string CNPJ,
    string Country
);