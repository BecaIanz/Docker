using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Devices.SignalExistence;

public class CheckExistenceHandler(
    IDevicesRepository deviceRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<SignalExistenceRequest, SignalExistenceResponse>
{
    private readonly IDevicesRepository deviceRepository = deviceRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IUnitOfWork unitOfWork = unitOfWork;
    private readonly IMapper mapper = mapper;
    
    public async Task<SignalExistenceResponse> Handle(
        SignalExistenceRequest request, CancellationToken cancellationToken)
    {
        var newDevice = mapper.Map<Device>(request);

        deviceRepository.Create(newDevice);

        await unitOfWork.Save(cancellationToken);
        
        return mapper.Map<SignalExistenceResponse>(newDevice);
    }
}