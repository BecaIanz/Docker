using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.DevicesRepository;
using MediatR;

namespace IAgro.Application.Features.Devices.CheckExistence;

public class CheckExistenceHandler(
    IDevicesRepository deviceRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<CheckExistenceRequest, CheckExisteneceResponse>
{
    private readonly IDevicesRepository deviceRepository = deviceRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;
    
    public async Task<CheckExisteneceResponse> Handle(
        CheckExistenceRequest request, CancellationToken cancellationToken)
    {
        var foundDevice = await deviceRepository.GetByCode(request.Code, cancellationToken)
            ?? throw new NotFoundException("Device Not Found."); 

        return mapper.Map<CheckExisteneceResponse>(foundDevice);
    }
}