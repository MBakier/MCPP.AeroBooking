using MCPP.AeroBooking.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Dtos.Hotels
{
    public class HotelDto
    {
        public HotelDto()
        {
            RoomIds = new List<int>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }

        public List<int> RoomIds { get; set; }
    }
}
