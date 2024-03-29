using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Service.Validators;

namespace Backend.Service.Services
{
    public class ProductService : BaseService<Product, ProductCreateValidator, ProductUpdateValidator>
    {
        public ProductService(IBaseRepository<Product> baseRepository) : base(baseRepository) { }
    }
}
