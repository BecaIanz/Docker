using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Fields.Delete;

public class DeleteFieldHandler(
    IFieldsRepository fieldsRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteFieldRequest, DeleteFieldResponse>
{
    private readonly IFieldsRepository fieldsRepository = fieldsRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    
    public async Task<DeleteFieldResponse> Handle(
        DeleteFieldRequest request, CancellationToken cancellationToken)
    {
        var sessionData = requestSession.GetSessionOrThrow();

        if(sessionData.Role == UserRole.Reader)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var field = await fieldsRepository.Get(request.Id, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        fieldsRepository.Delete(field);

        await unitOfWork.Save(cancellationToken);

        return new DeleteFieldResponse();
    }
}