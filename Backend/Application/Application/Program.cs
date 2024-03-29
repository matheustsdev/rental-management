using Backend.Application.Extensions;
using Backend.Data.Repository;
using Backend.Domain.Constants;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Backend.Service.Services;
using Backend.Service.Validators;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // Add services to the container.
            builder.Services.AddDbContext<DataContext>((optionsBuilder) =>
                optionsBuilder.UseNpgsql(configuration.GetConnectionString("DefaultConnection"), options => options.MigrationsHistoryTable("__EFMigrationsHistory", "rent"))
            );

            builder.Services.AddScoped<DbContext, DataContext>();
            builder.Services.AddScoped<IBaseService<Category, CategoryValidator, CategoryValidator>, CategoryService>();
            builder.Services.AddScoped<IBaseRepository<Category>, CategoryRepository>();
            builder.Services.AddScoped<IBaseService<Product, ProductCreateValidator, ProductUpdateValidator>, ProductService>();
            builder.Services.AddScoped<IBaseRepository<Product>, ProductRepository>();

            builder.Services.AddControllers();
            builder.Services.AddControllersWithViews().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new EnumStringConverter<EStatusResponse>());
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.UseDatabaseAutoMigration();

            app.Run();
        }
    }
}
