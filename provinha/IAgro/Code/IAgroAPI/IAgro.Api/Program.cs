using System.Text.Json.Serialization;
using IAgro.API.Config;
using IAgro.API.Middlewares;
using IAgro.API.Security;
using IAgro.Application;
using IAgro.Persistence;
using IAgro.Persistence.Seeding;
using IAgro.Persistence.Context;
using IAgro.Application.Common.Session;
using IAgro.Application.Contracts;
using IAgro.API.Services;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigurePersistence();
builder.Services.ConfigureApplication();

builder.Services.ConfigureCorsPolicy();

builder.Services.AddControllers()
    .AddJsonOptions(op =>
    {
        op.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        op.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddScoped<IRequestSession, RequestSession>();
builder.Services.AddScoped<IAuthenticator, AuthenticationService>();
builder.Services.AddScoped<IPasswordHasher, PasswordEncrypterService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

var serviceScope = app.Services.CreateScope();
var dataContext = serviceScope.ServiceProvider.GetService<IAgroContext>()
    ?? throw new InvalidOperationException("Failed to resolve AlmoxContext from service provider.");

dataContext.Database.EnsureCreated();
await dataContext.SeedData();

app.UseMiddleware<AuthenticateMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();
app.UseErrorHandler();
app.MapControllers();
app.Run();