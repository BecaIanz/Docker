using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Companies.Create;

public class CreateCompanyMapper : Profile
{
    public CreateCompanyMapper()
    {
        CreateMap<CreateCompanyRequest, Company>();
        CreateMap<Company, CreateCompanyResponse>();
    }
}