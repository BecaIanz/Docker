namespace IAgro.Application.Features.Fields.GetAll;
using MediatR;

public sealed record GetAllFieldsRequest() 
    : IRequest<List<GetAllFieldsResponse>>;