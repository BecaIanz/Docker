using MediatR;

namespace IAgro.Application.Features.Devices.CheckExistence;

public sealed record CheckExistenceRequest(
    string Code
) : IRequest<CheckExisteneceResponse>;