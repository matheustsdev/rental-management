using Backend.Infra.Data.Mapping;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Entities;

namespace Backend.Infra.Data.Context
{
    public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
		}
			
		public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(new CategoryMap().Configure);
        }
    }
}
