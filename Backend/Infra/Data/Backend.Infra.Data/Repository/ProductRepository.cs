using Backend.Domain.Entities;
using Backend.Infra.Data.Context;
using Backend.Infra.Data.Repository;

namespace Backend.Data.Repository
{
    public class ProductRepository: BaseRepository<Product>
    {
        public ProductRepository(DataContext dataContext) : base(dataContext) { }
    }
}
