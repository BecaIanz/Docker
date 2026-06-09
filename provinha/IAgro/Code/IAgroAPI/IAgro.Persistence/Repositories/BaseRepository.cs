using Microsoft.EntityFrameworkCore;
using IAgro.Persistence.Context;
using IAgro.Application.Repositories;
using IAgro.Domain.Models;

namespace IAgro.Persistence.Repositories;

public class BaseRepository<TModel>(IAgroContext IAgroContext) : IBaseRepository<TModel>
    where TModel : BaseModel
{
    protected readonly IAgroContext context = IAgroContext;
    protected readonly DbSet<TModel> dbSet = IAgroContext.Set<TModel>();

    public void Create(TModel entity)
        => context.Add(entity);

    public void Update(TModel entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        context.Update(entity);
    }

    public virtual Task<TModel?> Get(Guid id, CancellationToken cancellationToken)
        => context
            .Set<TModel>()
            .Where(entity => entity.DeletedAt == null)
            .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

    public virtual Task<List<TModel>> GetAll(CancellationToken cancellationToken)
        => context
            .Set<TModel>()
            .Where(entity => entity.DeletedAt == null)
            .ToListAsync(cancellationToken);

    public void Delete(TModel entity)
    {
        entity.DeletedAt = DateTime.UtcNow;
        context.Update(entity);
    }
    
    public Task<bool> Exists(Guid id, CancellationToken cancellationToken)
        => dbSet.AnyAsync(e => 
            EF.Property<Guid>(e, "Id") == id && 
            EF.Property<Guid?>(e, "DeletedAt") == null, 
        cancellationToken);
}