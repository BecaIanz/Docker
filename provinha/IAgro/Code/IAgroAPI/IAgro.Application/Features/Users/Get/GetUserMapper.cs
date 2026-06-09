using AutoMapper;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Users.Get;

public class GetUserMapper : Profile
{
    public GetUserMapper()
    {
        CreateMap<User, GetUserResponse>();
    }
}