using Backend.Domain.Entities;
using Backend.Infra.Data.Context;
using Backend.Infra.Data.Repository;

namespace Backend.Data.Repository
{
    public class CategoryRepository : BaseRepository<Category>
    {
        public CategoryRepository(DataContext dataContext) : base(dataContext)
        {
        }
    }
}
