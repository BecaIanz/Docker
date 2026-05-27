namespace Panetone.Models;

public class TaskToDo : Base
{
    public required string Name {get;set;}
    public required string Description {get;set;}
    public required string Responsible {get;set;}
    public required string Status {get;set;}
}