using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Service.Services
{
    public class CategoryService : IBaseService<Category>
    {

        public Category Add<TValidator>(Category entity) where TValidator : AbstractValidator<Category>
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid Id)
        {
            throw new NotImplementedException();
        }

        public IList<Category> Get()
        {
            return new List<Category>();
        }

        public Category GetById(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Category Update<TValidator>(Category entity) where TValidator : AbstractValidator<Category>
        {
            throw new NotImplementedException();
        }
    }
}
