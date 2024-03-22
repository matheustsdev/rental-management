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
        Task Insert (TEntity entity);

        void Update (TEntity entity);

        void Delete (Guid Id);

        IList<TEntity> Select();

        TEntity Select(Guid Id);

    }
}
