using MediatR;

namespace IAgro.Application.Features.Fields.Delete;

public sealed record DeleteFieldRequest(
    Guid Id
) : IRequest<DeleteFieldResponse>;