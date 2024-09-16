using Backend.Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Interfaces
{
    public interface IBaseService<TEntity, TCreateValidator, TUpdateValidator> 
        where TEntity : BaseEntity
        where TCreateValidator: AbstractValidator<TEntity>
        where TUpdateValidator: AbstractValidator<TEntity>
    {
        Task<TEntity> Add<TValidator>(TEntity entity) where TValidator: TCreateValidator;

        void Delete(Guid Id);

        IList<TEntity> Get(string[]? includes);

        TEntity GetById(Guid Id);

        TEntity Update<TValidator>(TEntity entity) where TValidator: TUpdateValidator;
    }
}
