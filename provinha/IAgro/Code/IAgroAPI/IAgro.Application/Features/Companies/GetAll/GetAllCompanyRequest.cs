namespace IAgro.Application.Features.Companies.GetAll;
using MediatR;

public sealed record GetAllCompaniesRequest() 
    : IRequest<List<GetAllCompaniesResponse>>;