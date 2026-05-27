using Azure;
using Microsoft.AspNetCore.Mvc;
using Panetone.UseCases.CreateTask;
using Panetone.UseCases.GetAllTask;

namespace Panetone.Endpoints;

public static class TaskEndpoint
{

    public static void ConfigureTaskEndpoints(this WebApplication app)
    {
        app.MapPost("/Task", async (
            [FromBody] CreateTaskRequest task,
            [FromServices] CreateTaskUsecase usecase
        ) => {
            await usecase.Do(task);
            return "panetone";
        });

        app.MapGet("/Task", async (
            [FromServices] GetAllTaskUsecase usecase
        ) => {
            var all = await usecase.Do(new());
            return all;
        });
    }

}