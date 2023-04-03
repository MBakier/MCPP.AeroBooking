using FluentValidation;
using MCPP.AeroBooking.Dtos.Customers;

namespace MCPP.AeroBooking.WebApi.FluentValidations
{
    public class CustomerValidator : AbstractValidator<CustomerDto>
    {
        public CustomerValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.FirstName).NotNull().Length(3, 16);
            RuleFor(x => x.LastName).NotNull().Length(3, 16);
            RuleFor(x => x.Gender).NotNull();
            RuleFor(x => x.DOB).NotNull();
        }
    }
