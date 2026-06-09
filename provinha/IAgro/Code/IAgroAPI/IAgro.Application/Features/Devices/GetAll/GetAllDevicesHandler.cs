using AutoMapper;
using MediatR;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Common.Session;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Common.Messages;
using IAgro.Application.Repositories.DevicesRepository;

namespace IAgro.Application.Features.Devices.GetAll;

public class GetAllDevicesHandler(
    IDevicesRepository deviceRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetAllDevicesRequest, List<GetAllDevicesResponse>>
{
    private readonly IDevicesRepository deviceRepository = deviceRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<List<GetAllDevicesResponse>> Handle(
        GetAllDevicesRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        if(!session.IsAdmin)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Admin);

        var companies = await deviceRepository.GetAll(cancellationToken);

        return mapper.Map<List<GetAllDevicesResponse>>(companies);
    }
}