using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Service.Validators;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Service.Services
{
    public class CategoryService : BaseService<Category, CategoryValidator, CategoryValidator>
    {
        public CategoryService(IBaseRepository<Category> baseRepository) : base(baseRepository)
        {
        }
    }
}
