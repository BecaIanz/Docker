namespace IAgro.Application.Features.Fields.Get;
using MediatR;

public sealed record GetFieldRequest(
    Guid Id
) : IRequest<GetFieldResponse>;