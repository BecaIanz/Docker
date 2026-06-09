namespace IAgro.Application.Features.Companies.GetAll;
using IAgro.Domain.Models;
using AutoMapper;

public class GetAllUsersMapper : Profile
{
    public GetAllUsersMapper()
    {
        CreateMap<Company, GetAllCompaniesResponse>();
    }
}