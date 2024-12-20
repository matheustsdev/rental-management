﻿using Backend.Domain.Interfaces;
using Backend.Domain.Entities;
using Backend.Service.Validators;
using AutoMapper;

namespace Backend.Application.Controllers
{
    public class CategoryController : BaseController<Category, CategoryValidator, CategoryValidator>
    {
        public CategoryController(IBaseService<Category, CategoryValidator, CategoryValidator> baseService, IMapper mapper) : base(baseService, mapper)
        {
        }
    }
}
    