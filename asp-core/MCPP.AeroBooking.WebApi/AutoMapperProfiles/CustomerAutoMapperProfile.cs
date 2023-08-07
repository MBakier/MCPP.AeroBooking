using AutoMapper;
using MCPP.AeroBooking.Dtos.Customers;
using MCPP.AeroBooking.Entities;

namespace MCPP.AeroBooking.WebApi.AutoMapperProfiles
{
    public class CustomerAutoMapperProfile : Profile
    {
        public CustomerAutoMapperProfile()
        {
            CreateMap<Customer, CustomerListDto>();
            CreateMap<Customer, CustomerDetailsDto>();
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
