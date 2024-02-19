using Backend.Infra.Data.Mapping;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Entities;

namespace Backend.Infra.Context
{
	public class AppContext: DbContext
	{
		public AppContext(DbContextOptions<AppContext> options) : base(options)
		{
		}

		public DbSet<User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>(new UserMap().Configure);
		}
	}
}
