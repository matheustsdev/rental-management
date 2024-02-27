using Backend.Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Service.Validators
{
    public class ProductUpdateValidator : AbstractValidator<Product>
    {
        public ProductUpdateValidator()
        {

            RuleFor(x => x.Reference);

            RuleFor(x => x.Description);

            RuleFor(x => x.ReceiptDescription);

            RuleFor(x => x.Category);

            RuleFor(x => x.Price);

        }
    }
}
