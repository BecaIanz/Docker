using AutoMapper;
using IAgro.Domain.Models;

namespace IAgro.Application.Features.Fields.GetAll;

public class GetAllFieldsMapper : Profile
{
    public GetAllFieldsMapper()
    {
        CreateMap<Field, GetAllFieldsResponse>();
    }
}