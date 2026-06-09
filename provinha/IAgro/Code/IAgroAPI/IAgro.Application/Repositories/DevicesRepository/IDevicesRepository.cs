using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.DevicesRepository;

public interface IDevicesRepository : IBaseRepository<Device>
{
    public Task<Device?> GetByCode(string code, CancellationToken cancellationToken);
    public Task<List<Device>> GetByCompany(Guid companyId, CancellationToken cancellationToken);
}