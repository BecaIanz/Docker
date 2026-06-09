using AutoMapper;
using IAgro.Application.Common.Exceptions;
using IAgro.Application.Common.Session;
using IAgro.Application.Repositories;
using IAgro.Application.Repositories.DevicesRepository;
using IAgro.Application.Repositories.FieldsRepository;
using IAgro.Domain.Common.Messages;
using IAgro.Domain.Models;
using MediatR;

namespace IAgro.Application.Features.FieldScans.Scan;

public class ScanHandler(
    IFieldScansRepository fieldScanRepository,
    IDevicesRepository devicesRepository, // Added devicesRepository
    // IRequestSession requestSession,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<ScanRequest, ScanResponse>
{
    public async Task<ScanResponse> Handle(
        ScanRequest request, CancellationToken cancellationToken)
    {
        // requestSession.GetSessionOrThrow();

        // Lookup device by code
        var device = await devicesRepository.GetByCode(request.DeviceCode, cancellationToken);
        if (device is null)
            throw new NotFoundException($"Device with code '{request.DeviceCode}' not found.");

        var fieldScan = mapper.Map<FieldScan>(request);
        fieldScan.DeviceId = device.Id; // Set DeviceId from found device
        fieldScan.Device = device;

        // Ensure StartedAt is UTC
        fieldScan.StartedAt = DateTime.SpecifyKind(fieldScan.StartedAt, DateTimeKind.Utc);

        var cropDiseases = request.CropDiseasesFound.Select(x => new CropDisease()
        {
            Disease = x.Disease,
            DetectedAt = DateTime.SpecifyKind(x.DetectedAt, DateTimeKind.Utc), // Ensure UTC
            LocationPoint = x.LocationPoint,   
            FieldScan = fieldScan,
            FieldScanId = fieldScan.Id,
        });

        fieldScan.CropDiseases.AddRange(cropDiseases);
        fieldScanRepository.Create(fieldScan);

        await unitOfWork.Save(cancellationToken);

        return mapper.Map<ScanResponse>(fieldScan);
    }
}