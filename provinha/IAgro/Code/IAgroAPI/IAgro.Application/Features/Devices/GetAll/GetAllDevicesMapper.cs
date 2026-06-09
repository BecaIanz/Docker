namespace IAgro.Application.Features.Devices.GetAll;
using IAgro.Domain.Models;
using AutoMapper;

public class GetAllDevicesMapper : Profile
{
    public GetAllDevicesMapper()
    {
        CreateMap<Device, GetAllDevicesResponse>();
    }
}