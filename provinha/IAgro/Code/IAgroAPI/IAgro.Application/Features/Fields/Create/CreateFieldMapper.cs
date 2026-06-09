using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Fields.Create;

public class ScanMapper : Profile
{
    public ScanMapper()
    {
        CreateMap<CreateFieldRequest, Field>();
        CreateMap<Field, CreateFieldResponse>();
    }
}