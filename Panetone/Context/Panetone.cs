using Microsoft.EntityFrameworkCore;
using Panetone.Models;

namespace Panetone.Contexts;

public class PanetoneContext(DbContextOptions<PanetoneContext> options) : DbContext(options)
{
    public DbSet<TaskToDo> TasksToDo {get;set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<TaskToDo>()
            .HasKey(t => t.Id);
        builder.Entity<TaskToDo>()
            .Property(t => t.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();
        builder.Entity<TaskToDo>()
            .Property(t => t.DisabledAt)
            .HasColumnName("disabled_at");
        builder.Entity<TaskToDo>()
            .Property(t => t.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired();

        builder.Entity<TaskToDo>()
            .Property(t => t.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Entity<TaskToDo>()
            .Property(t => t.Description)
            .HasMaxLength(255)
            .IsRequired();
        builder.Entity<TaskToDo>()
            .Property(t => t.Responsible)
            .HasMaxLength(255)
            .IsRequired();
        builder.Entity<TaskToDo>()
            .Property(t => t.Status)
            .HasMaxLength(255)
            .IsRequired();
    }
}