using MCPP.AeroBooking.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public DateTime BookingStart { get; set; }
        public DateTime BookingEnd { get; set; }
        public double TotalPrice { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }

        [NotMapped]
        public int NumberOfDays
        {
            get
            {
                return (BookingEnd - BookingStart).Days;
            }
        }


        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
