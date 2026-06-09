using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.CompaniesRepository;

public interface ICompaniesRepository : IBaseRepository<Company>
{
    Task<Company?> GetByCNPJ(String cnpj, CancellationToken cancellationToken);

}