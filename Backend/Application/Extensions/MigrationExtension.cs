using Backend.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Runtime.CompilerServices;

namespace Backend.Application.Extensions
{
    public static class MigrationExtension
    {
        public static void UseDatabaseAutoMigration(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var contexts = scope.ServiceProvider.GetRequiredService<IEnumerable<DbContext>>();

                var dataContext = contexts.FirstOrDefault(x => x is DataContext);

                dataContext!.Database.Migrate();

                using (var conn = (NpgsqlConnection)dataContext.Database.GetDbConnection())
                {
                    conn.Open();
                    conn.ReloadTypes();
                }
            }
        }
    }
}
