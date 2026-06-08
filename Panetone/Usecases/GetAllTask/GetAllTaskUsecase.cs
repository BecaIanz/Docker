using Panetone.Contexts;
using Panetone.Models;
using Panetone.UseCases.CreateTask;

namespace Panetone.UseCases.GetAllTask;

public class GetAllTaskUsecase
(
    PanetoneContext ctx
)
{
    public async Task<Result<GetAllTaskResponse>> Do(GetAllTaskRequest request)
    {
        var all = ctx.TasksToDo.Select(t => new UniqueTask
            (
                t.Name,
                t.Description,
                t.Responsible,
                t.Status
            )
        )
        .ToList();

        return Result<GetAllTaskResponse>.Success(new (all));
    }
}