using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Companies.Delete;

public class DeleteCompanyHandler(
    ICompaniesRepository companiesRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteCompanyRequest, DeleteCompanyResponse>
{
    private readonly ICompaniesRepository companiesRepository = companiesRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    
    public async Task<DeleteCompanyResponse> Handle(
        DeleteCompanyRequest request, CancellationToken cancellationToken)
    {
        var sessionData = requestSession.GetSessionOrThrow();

        if(!sessionData.IsAdmin)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var company = await companiesRepository.Get(request.Id, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        companiesRepository.Delete(company);

        await unitOfWork.Save(cancellationToken);

        return new DeleteCompanyResponse();
    }
}