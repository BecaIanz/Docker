using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Companies.Create;

public class CreateCompanyHandler(
    ICompaniesRepository companiesRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<CreateCompanyRequest, CreateCompanyResponse>
{
    private readonly ICompaniesRepository companiesRepository = companiesRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;
    
    public async Task<CreateCompanyResponse> Handle(
        CreateCompanyRequest request, CancellationToken cancellationToken)
    {
        var sessionData = requestSession.GetSessionOrThrow();

        if(!sessionData.IsAdmin)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var possibleSameCNPJCompany = await companiesRepository.GetByCNPJ(request.CNPJ, cancellationToken);

        if (possibleSameCNPJCompany is not null)
            throw new BadRequestException(details: "There must be only one company with this CNPJ.");

        var company = mapper.Map<Company>(request);

        companiesRepository.Create(company);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<CreateCompanyResponse>(company);
    }
}