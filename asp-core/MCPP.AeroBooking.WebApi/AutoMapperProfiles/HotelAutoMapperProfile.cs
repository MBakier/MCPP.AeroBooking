using AutoMapper;
using MCPP.AeroBooking.Dtos.Hotels;
using MCPP.AeroBooking.Entities;

namespace MCPP.AeroBooking.WebApi.AutoMapperProfiles
{
    public class HotelAutoMapperProfile : Profile
    {
        public HotelAutoMapperProfile() 
        {
            CreateMap<Hotel, HotelListDto>();
            CreateMap<Hotel, HotelDetailsDto>();
            CreateMap<Hotel, HotelDto>().ReverseMap();
        }
    }
}
