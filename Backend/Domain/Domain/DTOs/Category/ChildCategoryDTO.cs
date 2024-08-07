namespace Backend.Domain.DTOs.Category
{
    public class ChildCategoryDTO
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Deleted { get; set; }
    }
}