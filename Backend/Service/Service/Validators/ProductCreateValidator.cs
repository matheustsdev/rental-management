using Backend.Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Service.Validators
{
    public class ProductCreateValidator : AbstractValidator<Product>
    {
        public ProductCreateValidator()
        { 

            RuleFor(x => x.Reference)
                .NotEmpty().WithMessage("Adicione uma referência.")
                .NotNull().WithMessage("Adicione uma referência.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Adicione uma descrição.")
                .NotNull().WithMessage("Adicione uma descrição.");

            RuleFor(x => x.ReceiptDescription)
                .NotEmpty().WithMessage("Adicione uma descrição para o recibo.")
                .NotNull().WithMessage("Adicione uma descrição para o recibo.");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Adicione uma categoria.")
                .NotNull().WithMessage("Adicione uma categoria.");

            RuleFor(x => x.Price)
                .NotEmpty().WithMessage("Adicione um preço.")
                .NotNull().WithMessage("Adicione um preço.");

        }
    }
}
