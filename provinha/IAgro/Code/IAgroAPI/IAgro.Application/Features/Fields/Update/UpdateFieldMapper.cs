using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Fields.Update;

public class UpdateCompanyMapper : Profile
{
    public UpdateCompanyMapper()
    {
        CreateMap<UpdateFieldRequest, Field>();
        CreateMap<Field, UpdateFieldResponse>();
    }
}