using AutoMapper;
using Backend.Domain.DTOs.Category;
using Backend.Domain.DTOs.Product;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDTO>();
            CreateMap<Category, CategoryDTO>();
        }
    }
}
