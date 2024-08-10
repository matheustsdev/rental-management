using Backend.Application.Extensions;
using Backend.Data.Repository;
using Backend.Domain.Constants;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Backend.Service.Services;
using Backend.Service.Validators;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Backend.Application.Mappings;

namespace Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
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

            builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                });

            // Configuração do AutoMapper
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    policy =>
                    {
                        policy.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                    });
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

            // Apply CORS middleware before other middleware
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.MapControllers();

            app.UseDatabaseAutoMigration();
            app.UseCors(MyAllowSpecificOrigins);

            app.Run();
        }
    }
}
