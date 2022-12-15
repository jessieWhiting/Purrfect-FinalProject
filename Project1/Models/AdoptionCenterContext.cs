using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Project1.Models;

public partial class AdoptionCenterContext : DbContext
{
    public AdoptionCenterContext()
    {
    }

    public AdoptionCenterContext(DbContextOptions<AdoptionCenterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cat> Cats { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer("ConnectionStrings:ConnectionString");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cat>(entity =>
        {
            entity.HasKey(e => e.PetId).HasName("PK__Cat__48E53862010E094A");

            entity.ToTable("Cat");

            entity.Property(e => e.PetId).ValueGeneratedNever();
            entity.Property(e => e.Points).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__Favorite__CE74FAD53BBDB437");

            entity.Property(e => e.Note)
                .HasColumnType("text")
                .HasColumnName("note");

            entity.HasOne(d => d.Cat).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.CatId)
                .HasConstraintName("FK__Favorites__CatId__6D0D32F4");

            entity.HasOne(d => d.User).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Favorites__UserI__6C190EBB");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C2BDD0646");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.GoogleId).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(10);
            entity.Property(e => e.ZipCode).HasMaxLength(5);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
