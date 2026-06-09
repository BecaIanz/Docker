using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Fields.Get;

public class GetFieldHandler(
    IFieldsRepository fieldsRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetFieldRequest, GetFieldResponse>
{

    public async Task<GetFieldResponse> Handle(GetFieldRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        var company = await fieldsRepository.Get(request.Id, cancellationToken)
            ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

        if (!session.IsAdmin && session.UserCompanyId != company.Id)
            throw new ForbiddenException(ExceptionMessages.Forbidden.NotOwnUserNorAdmin); 

        return mapper.Map<GetFieldResponse>(company);
    }
}