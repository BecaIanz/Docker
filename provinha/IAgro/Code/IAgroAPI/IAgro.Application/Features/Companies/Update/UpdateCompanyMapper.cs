using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Companies.Update;

public class UpdateCompanyMapper : Profile
{
    public UpdateCompanyMapper()
    {
        CreateMap<UpdateCompanyRequestProps, Company>();
        CreateMap<Company, UpdateCompanyResponse>();
    }
}