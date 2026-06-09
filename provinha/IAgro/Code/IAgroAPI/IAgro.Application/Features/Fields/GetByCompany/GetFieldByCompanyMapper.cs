using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Fields.GetByCompany;

public class GetFieldByCompanyMapper : Profile
{
    public GetFieldByCompanyMapper()
    {
        CreateMap<Field, GetFieldByCompanyResponse>();
    }
}