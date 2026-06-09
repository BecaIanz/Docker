using IAgro.Domain.Objects;
using MediatR;

namespace IAgro.Application.Features.Fields.Update;

public sealed record UpdateFieldRequest(
    Guid FieldId,
    UpdateFieldRequestProps Props
) : IRequest<UpdateFieldResponse>;

public sealed record UpdateFieldRequestProps(
    string Nickname,
    double Area,
    string Crop,
    List<LocationPoint> LocationPoints
);