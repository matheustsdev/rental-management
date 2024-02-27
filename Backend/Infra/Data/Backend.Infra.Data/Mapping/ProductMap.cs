using Backend.Data.Mapping;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infra.Data.Mapping
{
    public class ProductMap : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("reg_products");

            MappingHelper.ConfigureDefaultProps(builder, "id_product");

            ConfigureProperties(builder);
            ConfigureRelationships(builder);
        }

        public void ConfigureProperties(EntityTypeBuilder<Product> builder)
        {
            builder.Property(x => x.Reference).HasColumnName("reference").HasColumnType("varchar(100)").IsRequired();
            builder.HasIndex(x => new { x.Reference }).IsUnique();

            builder.Property(x => x.Description).HasColumnName("description").HasColumnType("varchar(1000)").IsRequired();

            builder.Property(x => x.ReceiptDescription).HasColumnName("receipt_description").HasColumnType("varchar(500)").IsRequired(); ;

            builder.Property(x => x.Price).HasColumnName("price").HasColumnType("decimal").IsRequired();
        }

        public void ConfigureRelationships(EntityTypeBuilder<Product> builder)
        {
            builder.HasOne(x => x.Category).WithMany(x => x.Products).HasForeignKey(x => x.CategoryId);

            // builder.HasMany(x => x.ContractSecondaryContact).WithOne(x => x.SecondaryContact).HasForeignKey(x => new { x.SecondaryContactId, x.TenantId });
        }
    }
}

