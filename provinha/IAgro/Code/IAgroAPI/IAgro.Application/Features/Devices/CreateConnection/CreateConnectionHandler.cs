using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Devices.CreateConnection;

public class CreateConnectionHandler(
    IDevicesRepository deviceRepository,
    ICompaniesRepository companiesRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<CreateConnectionRequest, CreateConnectionResponse>
{

    public async Task<CreateConnectionResponse> Handle(
        CreateConnectionRequest request, CancellationToken cancellationToken)
    {
        var foundDevice = await deviceRepository.GetByCode(request.Code, cancellationToken)
            ?? throw new NotFoundException("Device not found.");

        var foundCompany = await companiesRepository.Get(request.CompanyId, cancellationToken)
            ?? throw new NotFoundException("Company not found.");

        var session = requestSession.GetSessionOrThrow();

        if (session.UserCompanyId != foundCompany.Id)
            throw new ForbiddenException(ExceptionMessages.Forbidden.NotOwnUser);

        foundDevice.CompanyId = request.CompanyId;

        foundDevice.Company = foundCompany;

        deviceRepository.Update(foundDevice);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<CreateConnectionResponse>(foundDevice);




    }
}