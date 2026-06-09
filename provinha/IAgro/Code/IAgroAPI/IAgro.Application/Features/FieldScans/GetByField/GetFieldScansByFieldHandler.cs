using IAgro.Application.Repositories;
using MediatR;
using IAgro.Domain.Models;
using IAgro.Application.Repositories.FieldsRepository;

namespace IAgro.Application.Features.FieldScans.GetByField;

public class GetFieldScansByFieldHandler(
    IFieldScansRepository fieldScansRepository
) : IRequestHandler<GetFieldScansByFieldRequest, List<FieldScan>>
{
    public async Task<List<FieldScan>> Handle(GetFieldScansByFieldRequest request, CancellationToken cancellationToken)
    {
        return await fieldScansRepository.GetByFieldId(request.FieldId, cancellationToken);
    }
}
