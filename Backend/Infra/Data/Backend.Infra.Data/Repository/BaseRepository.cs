using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;

namespace Backend.Infra.Data.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly DataContext _dataContext;

        public BaseRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Insert(TEntity entity)
        {
            _dataContext.Set<TEntity>().Add(entity);
            _dataContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _dataContext.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dataContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            _dataContext.Set<TEntity>().Remove(Select(id));
            _dataContext.SaveChanges();
        }

        public IList<TEntity> Select() => _dataContext.Set<TEntity>().ToList();

        public TEntity Select(Guid id) => _dataContext.Set<TEntity>().Find(id);
    }
}

