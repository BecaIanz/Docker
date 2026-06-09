    using AutoMapper;
    using IAgro.Application.Common.Exceptions;
    using IAgro.Application.Repositories;
    using IAgro.Application.Repositories.FieldsRepository;
    using IAgro.Domain.Common.Messages;
    using IAgro.Domain.Models;
    using MediatR;

    namespace IAgro.Application.Features.Fields.Update;

    public class UpdateFieldHandler(
        IFieldsRepository fieldsRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper
    ) : IRequestHandler<UpdateFieldRequest, UpdateFieldResponse>
    {
        private readonly IFieldsRepository fieldsRepository = fieldsRepository;
        private readonly IUnitOfWork unitOfWork = unitOfWork;
        private readonly IMapper mapper = mapper;
        
        public async Task<UpdateFieldResponse> Handle(
            UpdateFieldRequest request, CancellationToken cancellationToken)
        {
            var field = await fieldsRepository.Get(request.FieldId, cancellationToken)
                ?? throw new NotFoundException(ExceptionMessages.NotFound.Company);

            if (request.Props.Nickname is not null)
                field.Nickname = request.Props.Nickname;

            if (request.Props.Crop is not null)
                field.Crop = request.Props.Crop;

            field.Area = request.Props.Area;
            
            if (request.Props.LocationPoints is not null)
                field.LocationPoints = request.Props.LocationPoints;
                    
            fieldsRepository.Update(field);

            await unitOfWork.Save(cancellationToken);

            return mapper.Map<UpdateFieldResponse>(field);
        }
    }