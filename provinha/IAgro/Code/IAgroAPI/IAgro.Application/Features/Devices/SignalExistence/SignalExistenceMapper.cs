using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Devices.SignalExistence;

public class CheckExistenceMapper : Profile
{
    public CheckExistenceMapper()
    {
        CreateMap<SignalExistenceRequest, Device>();
        CreateMap<Device, SignalExistenceResponse>();
    }
}