using Backend.Data.Mapping;
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

            MappingHelper.ConfigureDefaultProps(builder, "id_category");

        }

        public void ConfigureProperties(EntityTypeBuilder<Category> builder)
        {

            builder.Property(x => x.Name).IsRequired().HasColumnName("name").HasColumnType("varchar(100)");

        }
    }
}

