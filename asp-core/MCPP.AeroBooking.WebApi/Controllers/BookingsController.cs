using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCPP.AeroBooking.EfCore;
using MCPP.AeroBooking.Entities;
using AutoMapper;
using MCPP.AeroBooking.Dtos.Bookings;

namespace MCPP.AeroBooking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BookingsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingListDto>>> GetBookings()
        {
            var bookings = await _context
                                      .Bookings
                                      .Include(b => b.Hotel)
                                      .Include(b => b.Room)
                                      .Include(b => b.Customer)
                                      .ToListAsync();

            var bookingDtos = _mapper.Map<List<BookingListDto>>(bookings);

            return bookingDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDetailsDto>> GetBooking(int id)
        {
            var booking = await _context
                                    .Bookings
                                    .Include(b => b.Hotel)
                                    .Include(b => b.Room)
                                    .Include(b => b.Customer)
                                    .SingleOrDefaultAsync(b => b.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            var bookingDetailsDto = _mapper.Map<BookingDetailsDto>(booking);

            return bookingDetailsDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
          if (_context.Bookings == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Bookings'  is null.");
          }
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private
        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion
    }
}
