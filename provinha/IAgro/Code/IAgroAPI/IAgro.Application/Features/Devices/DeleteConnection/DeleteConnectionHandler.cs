using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Devices.DeleteConnection;

public class DeleteConnectionHandler
(
    IDevicesRepository deviceRepository,
    ICompaniesRepository companiesRepository,
    IRequestSession requestSession,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteConnectionRequest, DeleteConnectionResponse>
{

    public async Task<DeleteConnectionResponse> Handle(
        DeleteConnectionRequest request, CancellationToken cancellationToken)
    {
        var foundDevice = await deviceRepository.GetByCode(request.Code, cancellationToken)
            ?? throw new NotFoundException("Device not found.");

        var foundCompany = await companiesRepository.Get(request.CompanyId, cancellationToken)
            ?? throw new NotFoundException("Company not found.");

        var session = requestSession.GetSessionOrThrow();

        if (session.UserCompanyId != foundCompany.Id)
            throw new ForbiddenException(ExceptionMessages.Forbidden.NotOwnUser);

        foundDevice.CompanyId = null;
        foundDevice.Company = null;

        Console.Write(foundDevice);

        deviceRepository.Update(foundDevice);

        await unitOfWork.Save(cancellationToken);

        return new DeleteConnectionResponse();
    }
}