using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Mapping
{
    public static class MappingHelper
    {
        public static void ConfigureDefaultProps<TEntity>(this EntityTypeBuilder<TEntity> builder, string idFieldName)
    where TEntity : BaseEntity
        {
            builder.Property(x => x.Id).HasColumnName(idFieldName).HasColumnType("uuid").IsRequired().HasDefaultValueSql("(uuid_generate_v4())");

            builder.Property(x => x.CreatedAt).HasColumnName("created_at").HasColumnType("timestamp").IsRequired().HasDefaultValueSql("(now() at time zone 'utc')");

            builder.Property(x => x.UpdatedAt).HasColumnName("updated_at").HasColumnType("timestamp");

            builder.Property(x => x.DeleteAt).HasColumnName("deleted_at").HasColumnType("timestamp");

            builder.Property(x => x.Deleted).HasColumnName("deleted").HasColumnType("boolean").IsRequired().HasDefaultValue(false);
        }
    }
}
