using MCPP.AeroBooking.Entities;
using MCPP.AeroBooking.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCPP.AeroBooking.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public Gender Gender { get; set; }
        public DateTime DOB { get; set; }
        public int Age { get; set; }
        public string FullName { get; set; }
    }
}