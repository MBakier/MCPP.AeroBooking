using AutoMapper;
using MCPP.AeroBooking.Dtos.Rooms;
using MCPP.AeroBooking.Entities;

namespace MCPP.AeroBooking.WebApi.AutoMapperProfiles
{
    public class RoomAutoMapperProfile : Profile
    {
        public RoomAutoMapperProfile() 
        {
            CreateMap<Room, RoomListDto>();
            CreateMap<Room, RoomDetailsDto>();
            CreateMap<Room, RoomDto>().ReverseMap();

        }
    }
}
