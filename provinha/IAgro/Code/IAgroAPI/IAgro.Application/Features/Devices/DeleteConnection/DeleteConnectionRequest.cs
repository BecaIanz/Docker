using MediatR;

namespace IAgro.Application.Features.Devices.DeleteConnection;

public sealed record DeleteConnectionRequest(
    Guid CompanyId,
    string Code
) : IRequest<DeleteConnectionResponse>;