using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCPP.AeroBooking.EfCore;
using MCPP.AeroBooking.Entities;
using AutoMapper;
using MCPP.AeroBooking.Dtos.Customers;

namespace MCPP.AeroBooking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();

            var customerDtos = _mapper.Map<List<CustomerListDto>>(customers);

            return customerDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context
                                    .Customers
                                    .SingleOrDefaultAsync(customer => customer.Id == id);

            if (_context.Customers == null)
            {
              return NotFound();
            }

            var customerDto = _mapper.Map<CustomerDetailsDto>(customer);

            return customerDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, CustomerDto customerDto)
        {
            if (id != customerDto.Id)
            {
                return BadRequest();
            }

            var customer = _mapper.Map<Customer>(customerDto);

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> CreateCustomer(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private
        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion
    }
}
