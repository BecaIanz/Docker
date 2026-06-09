using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Fields.Get;

public class GetFieldMapper : Profile
{
    public GetFieldMapper()
    {
        CreateMap<Field, GetFieldResponse>();
    }
}