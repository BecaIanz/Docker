using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.FieldsRepository;

public interface IFieldScansRepository : IBaseRepository<FieldScan>
{
    public Task<FieldScan?> LastScan(Guid fieldId, CancellationToken cancellationToken);
    public Task<List<FieldScan>> GetByCompany(Guid companyId, CancellationToken cancellationToken);
    public Task<List<FieldScan>> GetByFieldId(Guid fieldId, CancellationToken cancellationToken);
}