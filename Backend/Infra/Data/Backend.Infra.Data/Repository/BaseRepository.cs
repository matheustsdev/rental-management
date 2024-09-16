using Backend.Data.Extensions;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq;

namespace Backend.Infra.Data.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly DataContext _dataContext;

        public BaseRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            using (IDbContextTransaction transaction = await _dataContext.Database.BeginTransactionAsync())
            {
                try
                {
                    await _dataContext.Set<TEntity>().AddAsync(entity);
                    await _dataContext.SaveChangesAsync();

                    await transaction.CommitAsync();
                    return entity;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task Update(TEntity entity)
        {
            using (IDbContextTransaction transaction = await _dataContext.Database.BeginTransactionAsync())
            {
                try
                {
                    _dataContext.Entry(entity).State = EntityState.Modified;
                    await _dataContext.SaveChangesAsync();

                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public void Delete(Guid id)
        {
            {
                TEntity entity = Select(id);
                if (entity != null)
                {
                    entity.Deleted = true;
                    entity.DeleteAt = DateTime.Now;
                    Update(entity);
                }
            }
        } 

        public virtual IList<TEntity> Select()
        {
            string[] includes = Array.Empty<string>();

            return Select(includes); ;
        }
        public virtual IList<TEntity> Select(string[] includes)
        {
            if (includes.Length == 0)
            {
                return _dataContext.Set<TEntity>().ToList();
            }

            includes = includes.ToList().ConvertAll(x => x.Substring(0, 1).ToUpper() + x.Substring(1).ToLower()).ToArray();

            return _dataContext.Set<TEntity>().IncludeMultiple(includes).ToList(); 
        }

        public TEntity Select(Guid id) => _dataContext.Set<TEntity>().Find(id);
    }
}

