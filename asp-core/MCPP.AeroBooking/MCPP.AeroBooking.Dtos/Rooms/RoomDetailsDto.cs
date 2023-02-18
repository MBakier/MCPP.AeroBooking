using MCPP.AeroBooking.Dtos.Hotels;
using MCPP.AeroBooking.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Dtos.Rooms
{
    public class RoomDetailsDto
    {
        public RoomDetailsDto()
        {
            Hotels = new List<HotelDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int NumberOfOccupants { get; set; }
        public double Price { get; set; }
        public bool IsBooked { get; set; }

        public List<HotelDto> Hotels { get; set; }
    }
}
