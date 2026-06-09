using AutoMapper;
using MediatR;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Common.Session;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Common.Messages;
using IAgro.Application.Repositories.FieldsRepository;

namespace IAgro.Application.Features.Fields.GetAll;

public class GellAllFieldsHandler(
    IFieldsRepository fieldsRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetAllFieldsRequest, List<GetAllFieldsResponse>>
{
    private readonly IFieldsRepository fieldsRepository = fieldsRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<List<GetAllFieldsResponse>> Handle(
        GetAllFieldsRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        if(!session.IsAdmin)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var fields = await fieldsRepository.GetAll(cancellationToken);

        return mapper.Map<List<GetAllFieldsResponse>>(fields);
    }
}