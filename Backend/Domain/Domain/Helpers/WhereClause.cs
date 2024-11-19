using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class WhereClause<TEntity>
    {
        public string Property { get; set; }
        public string Comparator { get; set; }
        public string Value { get; set; }

        public void SetProperty(string propertyName)
        {
            var property = typeof(TEntity).GetProperty(propertyName);

            if (property == null)
                throw new ArgumentException($"A propriedade '{propertyName}' não existe no tipo '{typeof(TEntity).Name}'.");

            Property = property.Name;
        }
    }
}
