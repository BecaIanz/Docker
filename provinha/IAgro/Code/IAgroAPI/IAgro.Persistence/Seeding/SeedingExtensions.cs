using IAgro.Domain.Common.Enums;
using IAgro.Domain.Models;
using IAgro.Persistence.Config;
using IAgro.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IAgro.Persistence.Seeding;

public static class SeedingExtensions
{
    private static readonly string AdminEmail = DotEnv.Get("ADMIN_EMAIL");
    private static readonly string AdminPassword = DotEnv.Get("ADMIN_PASSWORD");
    private static readonly string IAgroCompanyName = "IAgro";
    private static readonly string IAgroCompanyCNPJ = "00000000000000";
    private static readonly string IAgroCompanyCountry = "Brazil";

    public static async Task SeedData(this IAgroContext context)
    {

        Console.WriteLine("============");
        Console.WriteLine(AdminEmail);
        Console.WriteLine(AdminPassword);
        Console.WriteLine("============");

        var departments = context.Set<Company>();
        var almoxExists = await departments.AnyAsync(d => d.Name == IAgroCompanyName);
        
        if(almoxExists)
            return;
        
        var almoxCompany = new Company()
        {
            Name = IAgroCompanyName,
            CNPJ = IAgroCompanyCNPJ,
            Country = IAgroCompanyCountry
        };
        departments.Add(almoxCompany);

        var users = context.Set<User>();
        var adminExists = await users.AnyAsync(u => u.Email == AdminEmail);

        if(adminExists)
            return; 
        
        var adminUser = new User()
        {
            CompanyId = almoxCompany.Id,
            Company = almoxCompany,
            Email = AdminEmail,
            Password = AdminPassword,
            Role = UserRole.Admin,
            Name = "Admin"
        };

        PasswordHasher<User> hasher = new();
        adminUser.Password = hasher.HashPassword(adminUser, adminUser.Password); 
        
        users.Add(adminUser);
        Console.WriteLine("=============");
        Console.WriteLine("USER CREATED!");
        Console.WriteLine("=============");
        await context.SaveChangesAsync();
    
    }
}