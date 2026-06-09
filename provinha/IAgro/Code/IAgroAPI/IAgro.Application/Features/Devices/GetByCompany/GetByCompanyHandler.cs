using AutoMapper;
using MediatR;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Common.Session;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Common.Messages;
using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Domain.Models;
using IAgro.Domain.Common.Enums;

namespace IAgro.Application.Features.Devices.GetByCompany;

public class GetByCompanyHandler(
    IDevicesRepository deviceRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetByCompanyRequest, List<GetByCompanyResponse>>
{
    private readonly IDevicesRepository deviceRepository = deviceRepository;
    private readonly IRequestSession requestSession = requestSession;
    private readonly IMapper mapper = mapper;

    public async Task<List<GetByCompanyResponse>> Handle(
        GetByCompanyRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        if(session.Role == UserRole.Reader)
            throw new ForbiddenException(ExceptionMessages.Forbidden.Role);

        var devices = await deviceRepository.GetByCompany(request.CompanyId, cancellationToken);

        return mapper.Map<List<GetByCompanyResponse>>(devices);
    }
}