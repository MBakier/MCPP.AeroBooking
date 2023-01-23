using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Entities
{
    public class Hotel
    {
        public Hotel() 
        {
            Rooms= new List<Room>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }

        public List<Room> Rooms { get; set; }
    }
}
