﻿using Backend.Domain.DTOs.Category;

namespace Backend.Domain.DTOs.Product
{
    public class ProductDTO
    {
        public string Reference { get; set; }
        public string Description { get; set; }
        public string ReceiptDescription { get; set; }
        public CategoryDTO Category { get; set; }
        public decimal Price { get; set; }
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Deleted { get; set; }
    }
}
