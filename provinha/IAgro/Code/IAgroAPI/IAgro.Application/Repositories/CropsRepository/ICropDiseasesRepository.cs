using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.CropsRepository;

public interface ICropDiseasesRepository : IBaseRepository<CropDisease>
{
    Task<int> CountByCompanyId(Guid companyId, CancellationToken cancellationToken);
}