using IAgro.Application.Repositories.CropsRepository;
using IAgro.Domain.Models;
using IAgro.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Repositories.Crops;

public class CropDiseasesRepository(IAgroContext context)
    : BaseRepository<CropDisease>(context), ICropDiseasesRepository
{
    public Task<int> CountByCompanyId(Guid companyId, CancellationToken cancellationToken)
        => context.Set<CropDisease>()
            .Where(cd => cd.DeletedAt == null)
            .Where(cd => cd.FieldScan.Field.CompanyId == companyId)
            .CountAsync(cancellationToken);
}
