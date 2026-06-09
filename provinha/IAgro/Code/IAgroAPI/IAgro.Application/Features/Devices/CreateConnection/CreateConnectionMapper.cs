using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Devices.CreateConnection;

public class CreateConnectionMapper : Profile
{
    public CreateConnectionMapper()
    {
        CreateMap<Device, CreateConnectionResponse>();
    }
}