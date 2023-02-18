using AutoMapper;
using MCPP.AeroBooking.Dtos.Bookings;
using MCPP.AeroBooking.Entities;

namespace MCPP.AeroBooking.WebApi.AutoMapperProfiles
{
    public class BookingAutoMapperProfile : Profile
    {
        public BookingAutoMapperProfile()
        {
            CreateMap<Booking, BookingListDto>();
            CreateMap<Booking, BookingDetailsDto>();
            CreateMap<Booking, BookingDto>().ReverseMap();
        }
    }
}
