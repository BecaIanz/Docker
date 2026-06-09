namespace IAgro.Domain.Objects;

public class LocationPoint(double latitude, double longitude)
{
    public double Latitude { get; set; } = latitude;
    public double Longitude { get; set; } = longitude;
}
