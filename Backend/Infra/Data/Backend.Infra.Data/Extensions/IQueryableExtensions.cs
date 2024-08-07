using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace Backend.Data.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<TEntity> IncludeMultiple<TEntity>(this IQueryable<TEntity> query, params string[] includes) where TEntity : class
        {
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }
    }
}
