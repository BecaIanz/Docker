using IAgro.Application.Repositories;
using IAgro.Persistence.Context;

namespace IAgro.Persistence.Repositories;

public class UnitOfWork(IAgroContext ctx) : IUnitOfWork
{
    private readonly IAgroContext context = ctx;
    
    public Task Save(CancellationToken cancellationToken)
    {
        return context.SaveChangesAsync(cancellationToken);
    }
}