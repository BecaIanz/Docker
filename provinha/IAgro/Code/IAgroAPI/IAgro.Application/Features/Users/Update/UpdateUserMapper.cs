using AutoMapper;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Users.Update;

public class UpdateUserMapper : Profile
{
    public UpdateUserMapper()
    {
        CreateMap<UpdateUserRequest, User>();
        CreateMap<User, UpdateUserResponse>();
    }
}