using MediatR;

namespace IAgro.Application.Features.Companies.Insights;

public sealed record CompanyInsightsRequest(
    Guid CompanyId
) : IRequest<CompanyInsightsResponse>;