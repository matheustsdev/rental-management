using Backend.Domain.Entities;
using Backend.Infra.Data.Context;
using Backend.Infra.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repository
{
    public class ProductRepository: BaseRepository<Product>
    {
        public ProductRepository(DataContext dataContext) : base(dataContext) { }
    }
}
