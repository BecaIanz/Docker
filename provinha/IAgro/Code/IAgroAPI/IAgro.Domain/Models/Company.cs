namespace IAgro.Domain.Models;

public class Company : BaseModel
{
    public required string Name { get; set; }
    public required string CNPJ { get; set; }
    public required string Country { get; set; }

    public List<User> Users { get; } = [];
    public List<Field> Fields { get; } = [];
    public List<Device> Devices { get; set; } = [];
}
