using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.FieldsRepository;

public interface IFieldsRepository : IBaseRepository<Field>
{
    public Task<List<Field>> GetByCompany(Guid companyId, CancellationToken cancellationToken);
    public Task<int> CountByCompany(Guid companyId, CancellationToken cancellationToken);
    public Task<double> SumAcresByCompany(Guid companyId, CancellationToken cancellationToken);
}