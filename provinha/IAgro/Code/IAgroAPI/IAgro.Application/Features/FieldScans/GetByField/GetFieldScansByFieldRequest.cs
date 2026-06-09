using IAgro.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;

namespace IAgro.Application.Features.FieldScans.GetByField
{
    public sealed record GetFieldScansByFieldRequest(Guid FieldId) : IRequest<List<FieldScan>>;
}
