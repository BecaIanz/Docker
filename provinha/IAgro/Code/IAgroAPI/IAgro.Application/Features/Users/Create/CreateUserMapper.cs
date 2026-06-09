using AutoMapper;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Users.Create;

public class UpdateUserMapper : Profile
{
    public UpdateUserMapper()
    {
        CreateMap<CreateUserRequest, User>();
        CreateMap<User, CreateUserResponse>();
    }
}