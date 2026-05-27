namespace Panetone.UseCases.GetAllTask;

public record GetAllTaskResponse
(
    ICollection<UniqueTask> Tasks
);

public record UniqueTask(
    string Name,
    string Description,
    string Responsible,
    string Status
);