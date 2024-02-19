using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infra.Data.Mapping
{
    public class CategoryMap : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("reg_categories");

            builder.HasKey(x => x.Id).HasName("id_category");

            builder.Property(x => x.Name).IsRequired().HasColumnName("name").HasColumnType("varchar(100)");
        }
    }
}

