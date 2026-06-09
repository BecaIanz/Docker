namespace IAgro.Application.Features.Companies.Insights;

public sealed record CompanyInsightsResponse(
    int TotalFields,
    double TotalAcres,
    int AverageHealth,
    int TotalDiseasesDetected,
    List<FieldPresenter> Fields 
);

public sealed record FieldPresenter(
    string Nickname,
    int DiseaseCount
);