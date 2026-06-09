using IAgro.Domain.Models;
using AutoMapper;

namespace IAgro.Application.Features.Fields.GetLastScan;

public class GetLastScanMapper : Profile
{
    public GetLastScanMapper()
    {
        CreateMap<Field, GetLastScanResponse>();
    }
}