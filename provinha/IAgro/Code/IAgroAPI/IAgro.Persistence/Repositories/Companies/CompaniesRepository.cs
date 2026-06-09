using IAgro.Application.Repositories.CompaniesRepository;
using IAgro.Domain.Models;
using IAgro.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Repositories.Companies;

public class CompaniesRepository(
    IAgroContext context
) : BaseRepository<Company>(context), ICompaniesRepository
{
    public override Task<Company?> Get(Guid id, CancellationToken cancellationToken)
        => context.Set<Company>()
            .Where(c => c.DeletedAt == null)
            .Include(c => c.Users)
            .Include(c => c.Fields)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

    public Task<Company?> GetByCNPJ(string cnpj, CancellationToken cancellationToken)
    => context.Set<Company>()
        .Where(c => c.DeletedAt == null)
        .Where(c => c.CNPJ == cnpj)
        .FirstOrDefaultAsync(cancellationToken);
}