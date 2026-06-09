using MediatR;

namespace IAgro.Application.Features.Devices.CreateConnection;

public sealed record CreateConnectionRequest(
    string Code,
    Guid CompanyId
) : IRequest<CreateConnectionResponse>;