using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class GeneralDbContext : DbContext
    {
        public GeneralDbContext(DbContextOptions options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecordData>()
                .HasOne<Control>()
                .WithMany()
                .HasForeignKey(rd => rd.ControlId);

            modelBuilder.Entity<RecordData>()
                .HasOne<Record>()
                .WithMany(r => r.RecordData)
                .HasForeignKey(rd => rd.RecordId);

            modelBuilder.Entity<ImpactType>()
                .HasOne<IncidentType>()
                .WithMany()
                .HasForeignKey(s => s.IncidentTypeId);

            modelBuilder.Entity<EventType>()
                .HasOne<IncidentType>()
                .WithMany()
                .HasForeignKey(s => s.IncidentTypeId);
            
            // modelBuilder.Entity<Record>()
            //     .HasMany(b => b.RecordData)
            //     .WithOne();
        }
        
        public DbSet<Control> Controls { get; set; }
        public DbSet<Interface> Interfaces { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<RecordData> RecordData { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<IncidentType> IncidentTypes { get; set; }
        public DbSet<ImpactType> ImpactTypes { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
    }
}