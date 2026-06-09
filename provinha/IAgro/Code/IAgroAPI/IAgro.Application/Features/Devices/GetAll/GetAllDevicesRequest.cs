namespace IAgro.Application.Features.Devices.GetAll;
using MediatR;

public sealed record GetAllDevicesRequest() 
    : IRequest<List<GetAllDevicesResponse>>;