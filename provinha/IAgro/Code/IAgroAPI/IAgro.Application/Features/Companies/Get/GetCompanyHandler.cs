using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Companies.Get;

public class GetFieldHandler(
    ICompaniesRepository companiesRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetCompanyRequest, GetCompanyResponse>
{
    private readonly ICompaniesRepository companiesRepository = companiesRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<GetCompanyResponse> Handle(GetCompanyRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        var company = await companiesRepository.Get(request.Id, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        if (!session.IsAdmin && session.UserCompanyId != company.Id)
            throw new ForbiddenException(ExceptionMessages.Forbidden.NotOwnUserNorAdmin); 

        return mapper.Map<GetCompanyResponse>(company);
    }
}