using Backend.Domain.DTOs.Product;

namespace Backend.Domain.DTOs.Category
{
    public class CategoryDTO
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Deleted { get; set; }
        public ICollection<ProductDTO> Products { get; set; }
    }
}
