namespace IAgro.Application.Features.Users.GetAll;
using MediatR;

public sealed record GetAllUsersRequest() 
    : IRequest<List<GetAllUsersResponse>>;