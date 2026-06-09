using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Features.Fields.Create;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Fields.Create;

public class CreateFieldHandler(
    IFieldsRepository fieldsRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<CreateFieldRequest, CreateFieldResponse>
{
    private readonly IFieldsRepository fieldsRepository = fieldsRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;
    
    public async Task<CreateFieldResponse> Handle(
        CreateFieldRequest request, CancellationToken cancellationToken)
    {
        var sessionData = requestSession.GetSessionOrThrow();

        if (sessionData.Role == UserRole.Reader)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Role);

        var field = mapper.Map<Field>(request);

        fieldsRepository.Create(field);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<CreateFieldResponse>(field);
    }
}