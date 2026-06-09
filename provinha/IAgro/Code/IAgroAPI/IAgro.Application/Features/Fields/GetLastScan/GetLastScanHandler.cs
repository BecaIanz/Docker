using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Features.Fields.Get;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Common.Messages;
using MediatR;

namespace IAgro.Application.Features.Fields.GetLastScan;

public class GetLastScanHandler(
    IFieldsRepository fieldsRepository,
    IFieldScansRepository fieldScanRepository,
    IRequestSession requestSession,
    IMapper mapper
) : IRequestHandler<GetLastScanRequest, List<GetLastScanResponse>>
{
    public async Task<List<GetLastScanResponse>> Handle(GetLastScanRequest request, CancellationToken cancellationToken)
    {
        var session = requestSession.GetSessionOrThrow();

        var fields = await fieldsRepository.GetByCompany(request.Id, cancellationToken);

        var list = new List<GetLastScanResponse>();

        foreach (var f in fields)
        {
            var lastScan = await fieldScanRepository.LastScan(f.Id, cancellationToken);
            var fieldRes = mapper.Map<GetFieldResponse>(f);

            if (lastScan is null)
            {
                list.Add(new GetLastScanResponse(fieldRes, null));
            }
            else
            {
                list.Add(new GetLastScanResponse(fieldRes, lastScan.CreatedAt));
            }
        }

        return list;
    }
}
