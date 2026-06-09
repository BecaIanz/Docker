using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Devices.CheckExistence;

public class CheckExistenceMapper : Profile
{
    public CheckExistenceMapper()
    {
        CreateMap<CheckExistenceRequest, Device>();
        CreateMap<Device, CheckExisteneceResponse>();
    }
}