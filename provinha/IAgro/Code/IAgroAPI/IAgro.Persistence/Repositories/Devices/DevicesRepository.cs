using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Domain.Models;
using IAgro.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Repositories.Devices;

public class DevicesRepository(IAgroContext context)
    : BaseRepository<Device>(context), IDevicesRepository
{
    public Task<Device?> GetByCode(string code, CancellationToken cancellationToken)
        => context.Set<Device>()
            .Where(d => d.DeletedAt == null && d.Code == code)
            .FirstOrDefaultAsync(cancellationToken);

    public Task<List<Device>> GetByCompany(Guid companyId, CancellationToken cancellationToken)
        => context.Set<Device>()
            .Where(d => d.DeletedAt == null && d.CompanyId == companyId)
            .ToListAsync(cancellationToken);
}
