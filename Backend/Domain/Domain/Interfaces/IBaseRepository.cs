using Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity: BaseEntity
    {
        Task<TEntity> InsertAsync(TEntity entity);
        Task Update(TEntity entity);

        void Delete (Guid Id);

        IList<TEntity> Select(string[] includes);

        IList<TEntity> Select();

        TEntity Select(Guid Id);

    }
}
