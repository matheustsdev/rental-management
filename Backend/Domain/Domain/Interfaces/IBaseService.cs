using Backend.Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Interfaces
{
    public interface IBaseService<TEntity> where TEntity : BaseEntity
    {
        TEntity Add<TValidator>(TEntity entity) where TValidator: AbstractValidator<TEntity>;

        void Delete(Guid Id);

        IList<TEntity> Get();

        TEntity GetById(Guid Id);

        TEntity Update<TValidator>(TEntity entity) where TValidator: AbstractValidator<TEntity>;
    }
}
