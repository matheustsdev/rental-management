using FluentValidation;
using Backend.Domain.Entities;

namespace Backend.Service.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Please enter the name")
                .NotNull().WithMessage("Please enter the name");
        }
    }
}
