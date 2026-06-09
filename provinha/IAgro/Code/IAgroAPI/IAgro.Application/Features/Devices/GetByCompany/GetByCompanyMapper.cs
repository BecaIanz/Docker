namespace IAgro.Application.Features.Devices.GetByCompany;
using IAgro.Domain.Models;
using AutoMapper;

public class GetByCompanyMapper : Profile
{
    public GetByCompanyMapper()
    {
        CreateMap<Device, GetByCompanyResponse>();
    }
}