using IAgro.Application.Repositories.CropsRepository;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.Companies.Insights;

public class CompanyInsightsHandler(
    ICropDiseasesRepository cropDiseasesRepository,
    IFieldScansRepository fieldScansRepository,
    IFieldsRepository fieldsRepository
) : IRequestHandler<CompanyInsightsRequest, CompanyInsightsResponse>
{
    public async Task<CompanyInsightsResponse> Handle(
        CompanyInsightsRequest request, CancellationToken cancellationToken)
    {
        int totalFields = await fieldsRepository.CountByCompany(request.CompanyId, cancellationToken);
        double totalAcres = await fieldsRepository.SumAcresByCompany(request.CompanyId, cancellationToken);
        int totalDiseasesDetected = await cropDiseasesRepository.CountByCompanyId(request.CompanyId, cancellationToken);
        int averageHealth = 100 - (totalDiseasesDetected % 100);
        List<FieldScan> fields = await fieldScansRepository.GetByCompany(request.CompanyId, cancellationToken);

        return new CompanyInsightsResponse(
            totalFields,
            totalAcres,
            averageHealth,
            totalDiseasesDetected,
            [..fields.Select(x => new FieldPresenter(x.Field.Nickname, x.CropDiseases.Count))]
        );
    }
}
