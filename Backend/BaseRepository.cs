using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using System.Collections.Generic;
using System.Linq;
using System;

public class BaseRepository<TEntity> :IBaseRepository<TEntity> where TEntity : BaseEntity
{
	protected readonly AppContext _appContext;

    public BaseRepository(AppContext appContext)
	{
		_appContext = appContext;
	}

	public void Insert(TEntity entity)
	{
		_appContext.Set<TEntity>().Add(entity);
		_appContext.SaveChanges();
	}

	public void Update(TEntity entity)
	{
		_appContext.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
		_appContext.SaveChanges();
	}

	public void Delete(Guid id)
	{
		_appContext.Set<TEntity>().Remove(Select(id));
		_appContext.SaveChanges();
	}

	public IList<TEntity> Select() => _appContext.Set<TEntity>().ToList();

	public TEntity Select(Guid id) => _appContext.Set<TEntity>().Find(id);
}
