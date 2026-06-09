using MediatR;

namespace IAgro.Application.Features.Devices.SignalExistence;

public sealed record SignalExistenceRequest(
    string Code
) : IRequest<SignalExistenceResponse>;