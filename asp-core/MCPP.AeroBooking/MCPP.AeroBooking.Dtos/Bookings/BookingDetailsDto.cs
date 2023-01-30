using MCPP.AeroBooking.Entities;
using MCPP.AeroBooking.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Dtos.Bookings
{
    public class BookingDetailsDto
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public DateTime BookingStart { get; set; }
        public DateTime BookingEnd { get; set; }
        public double TotalPrice { get; set; }
        public int NumberOfDays { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }
        public AeroPlaneClass AeroPlaneClass { get; set; }

        public int HotelId { get; set; }
        public string HotelName { get; set; }

        public int CustomerId { get; set; }
        public string CustomerFullName { get; set; }
    }
}
