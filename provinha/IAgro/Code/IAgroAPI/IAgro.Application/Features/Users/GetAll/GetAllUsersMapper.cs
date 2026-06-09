namespace IAgro.Application.Features.Users.GetAll;
using IAgro.Domain.Models;
using AutoMapper;

public class GetAllUsersMapper : Profile
{
    public GetAllUsersMapper()
    {
        CreateMap<User, GetAllUsersResponse>();
    }
}