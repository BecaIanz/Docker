using IAgro.Application.Repositories.UsersRepository;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;
using IAgro.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Repositories.Users;

public class UsersRepository(IAgroContext context)
    : BaseRepository<User>(context), IUsersRepository
{
    public Task<User?> GetByEmail(string email, CancellationToken cancellationToken)
        => context.Set<User>()
            .Where(entity => entity.DeletedAt == null)
            .Where(u => u.Email == email)
            .FirstOrDefaultAsync(cancellationToken);

    public Task<List<User>> GetManagers(CancellationToken cancellationToken)
        => context.Set<User>()
            .Where(entity => entity.DeletedAt == null)
            .Where(u => u.Role == UserRole.Manager)
            .ToListAsync(cancellationToken);

    public Task<List<User>> GetByCompany(Guid companyId, CancellationToken cancellationToken)
        => context.Set<User>()
            .Where(entity => entity.DeletedAt == null)
            .Where(u => u.CompanyId == companyId)
            .ToListAsync(cancellationToken);
}