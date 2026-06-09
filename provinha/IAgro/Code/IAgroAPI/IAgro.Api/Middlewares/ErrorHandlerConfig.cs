using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Common.Enums;
using IAgro.Domain.Common.Messages;

namespace IAgro.API.Middlewares;

public static class ErrorHandlerExtensions
{
    public static void UseErrorHandler(this IApplicationBuilder app) => 
        app.UseExceptionHandler(error => 
        {
            error.Run(async context => 
            {
                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if(contextFeature is null) return;

                var statusCode = contextFeature.Error switch
                {
                    AppException appError => appError.StatusCode,
                    _ => StatusCode.InternalServerError
                };
                var message = contextFeature.Error switch
                {
                    AppException appError => appError.Message,
                    _ => ExceptionMessages.InternalServerError.Default
                };
                var details = contextFeature.Error switch
                {
                    AppException appError => appError.Details,
                    _ => null
                };

                context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) statusCode;

                var errorResponse = new { statusCode, message, details };

                await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
            });
        });
}