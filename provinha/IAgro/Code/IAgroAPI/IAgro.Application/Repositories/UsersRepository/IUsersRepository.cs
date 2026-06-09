using IAgro.Domain.Models;

namespace IAgro.Application.Repositories.UsersRepository;

public interface IUsersRepository : IBaseRepository<User>
{
    Task<User?> GetByEmail(string email, CancellationToken cancellationToken);
    Task<List<User>> GetManagers(CancellationToken cancellationToken);
    Task<List<User>> GetByCompany(Guid companyId, CancellationToken cancellationToken);
}