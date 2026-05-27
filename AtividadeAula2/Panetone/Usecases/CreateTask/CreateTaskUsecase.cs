using Panetone.Contexts;
using Panetone.Models;

namespace Panetone.UseCases.CreateTask;

public class CreateTaskUsecase
(
    PanetoneContext ctx
)
{
    public async Task<Result<CreateTaskResponse>> Do(CreateTaskRequest request)
    {
        var task = new TaskToDo
        {
            Name=request.Name,
            Description=request.Description,
            Responsible=request.Responsible,
            Status=request.Status
        };
        ctx.TasksToDo.Add(task);
        await ctx.SaveChangesAsync();

        return Result<CreateTaskResponse>.Success(new CreateTaskResponse());
    }
}