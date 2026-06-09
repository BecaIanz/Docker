using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using IAgro.Application.Common.Exceptions;
using IAgro.Domain.Models;
using IAgro.Application.Contracts;
using IAgro.Domain.Common.Messages;
using IAgro.API.Config;
using IAgro.Domain.Objects;
using IAgro.Domain.Common.Enums;

namespace IAgro.API.Services;

public class AuthenticationService : IAuthenticator
{
    public string SecretKey { get; private set; } = DotEnv.Get("SECRET_KEY");
    public int ExpireHours { get; private set; } = int.Parse(DotEnv.Get("EXPIRE_HOURS"));

    private static class PayloadKeys
    {
        public const string UserId = "sub";
        public const string CompanyId = "company_id";
        public const string Role = "user_role";
    }

    public string GenerateUserToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(SecretKey);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity([ 
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(PayloadKeys.CompanyId, user.CompanyId.ToString()), 
                new Claim(PayloadKeys.UserId, user.Id.ToString()),
                new Claim(PayloadKeys.Role, user.Role.ToString()),
            ]),
            
            Expires = DateTime.UtcNow.AddHours(ExpireHours),
            
            SigningCredentials = new(
                new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256Signature
            ),
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public SessionData ExtractToken(string token)
    {
        var key = Encoding.ASCII.GetBytes(SecretKey);
        var tokenHandler = new JwtSecurityTokenHandler();

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };

        try
        {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

            var userId = principal.FindFirst(PayloadKeys.UserId)?.Value
                ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new SecurityTokenException("Invalid token: missing sub claim.");

            var companyId = principal.FindFirst(PayloadKeys.CompanyId)?.Value
                ?? throw new SecurityTokenException("Invalid token: missing company id claim.");
                
            var role = principal.FindFirst(PayloadKeys.Role)?.Value
                ?? throw new SecurityTokenException("Invalid token: missing user role claim.");

            if (!Guid.TryParse(userId, out Guid parsedUserId))
                throw new SecurityTokenException("Invalid token: user id format.");

            if (!Guid.TryParse(companyId, out Guid parsedCompanyId))
                throw new SecurityTokenException("Invalid token: company id format.");

            if(!Enum.TryParse(role, out UserRole parsedRole))
                throw new SecurityTokenException("Invalid token: user role format.");

            return new SessionData
            {
                UserId = parsedUserId,
                UserCompanyId = parsedCompanyId,
                Role = parsedRole,
                IsAdmin = parsedRole == UserRole.Admin
            };
        }
        catch(Exception e)
        {
            throw new UnauthorizedException(ExceptionMessages.Unauthorized.Token, e.Message);
        }
    }
}

