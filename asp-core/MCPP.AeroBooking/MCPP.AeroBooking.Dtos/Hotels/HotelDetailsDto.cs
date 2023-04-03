using MCPP.AeroBooking.Dtos.Rooms;
using MCPP.AeroBooking.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Dtos.Hotels
{
    public class HotelDetailsDto
    {
        public HotelDetailsDto()
        {
            Rooms = new List<RoomDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }

        public List<RoomDto> Rooms { get; set; }
    }
}
