using AutoMapper;
using Backend.Domain.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.DTOs.Product;
using Backend.Service.Validators;

namespace Backend.Application.Controllers
{
    public class ProductController : BaseController<Product, ProductCreateValidator,  ProductUpdateValidator>
    {
        public ProductController(IBaseService<Product, ProductCreateValidator, ProductUpdateValidator> baseService, IMapper mapper) : base(baseService, mapper) 
        {
        }
    }
}
