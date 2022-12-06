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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source={Secret.Server};Initial Catalog=AdoptionCenter; User Id={Secret.userName}; Password={Secret.passWord}");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cat>(entity =>
        {
            entity.HasKey(e => e.PetId).HasName("PK__Cat__48E53862010E094A");

            entity.ToTable("Cat");

            entity.Property(e => e.PetId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__Favorite__CE74FAD519426691");

            entity.HasOne(d => d.Cat).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.CatId)
                .HasConstraintName("FK__Favorites__CatId__619B8048");

            entity.HasOne(d => d.User).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Favorites__UserI__60A75C0F");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CFB71A210");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(10);
            entity.Property(e => e.ZipCode).HasMaxLength(5);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
