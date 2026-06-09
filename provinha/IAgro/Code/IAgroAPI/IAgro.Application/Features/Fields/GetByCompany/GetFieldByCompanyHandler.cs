using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories.FieldsRepository;
using MediatR;

namespace IAgro.Application.Features.Fields.GetByCompany;

public class GetFieldByCompanyHandler(
    IFieldsRepository fieldsRepository,
    IMapper mapper
) : IRequestHandler<GetFieldByCompanyRequest, List<GetFieldByCompanyResponse>>
{
    public async Task<List<GetFieldByCompanyResponse>> Handle(
        GetFieldByCompanyRequest request,
        CancellationToken cancellationToken)
    {

        var fields = await fieldsRepository.GetByCompany(request.Id, cancellationToken);

        return mapper.Map<List<GetFieldByCompanyResponse>>(fields);
    }
}
