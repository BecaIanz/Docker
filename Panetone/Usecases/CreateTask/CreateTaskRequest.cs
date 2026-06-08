namespace Panetone.UseCases.CreateTask;

public record CreateTaskRequest(
    string Name,
    string Description,
    string Responsible,
    string Status
);