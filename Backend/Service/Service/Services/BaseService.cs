using FluentValidation;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;


namespace Backend.Service.Services
{
    public class BaseService<TEntity, TCreateValidator, TUpdateValidator> : IBaseService<TEntity, TCreateValidator, TUpdateValidator> 
        where TEntity : BaseEntity
        where TCreateValidator : AbstractValidator<TEntity>
        where TUpdateValidator : AbstractValidator<TEntity>
    {
        private readonly IBaseRepository<TEntity> _baseRepository;

        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public TEntity Add<TValidator>(TEntity entity) where TValidator : TCreateValidator
        {
            Validate(entity, Activator.CreateInstance<TValidator>());

            _baseRepository.Insert(entity);

            return entity;
        }

        public void Delete(Guid id) => _baseRepository.Delete(id);

        public IList<TEntity> Get() => _baseRepository.Select();

        public TEntity GetById(Guid id) => _baseRepository.Select(id);

        public TEntity Update<TValidator>(TEntity entity) where TValidator : TUpdateValidator
        {
            Validate(entity, Activator.CreateInstance<TValidator>());

            _baseRepository.Update(entity);

            return entity;
        }

        private void Validate(TEntity obj, AbstractValidator<TEntity> validator)
        {
            if (obj == null)
                throw new Exception("Registros não detectados!");

            validator.ValidateAndThrow(obj);
        }
    }
}
