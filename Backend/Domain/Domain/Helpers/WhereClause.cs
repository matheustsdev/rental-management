using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class WhereClause<TEntity>
    {
        public TEntity.GetProperties() Property { get; set }
        public string Comparator { get; set }
        public string Value { get; set; }
    }
}
