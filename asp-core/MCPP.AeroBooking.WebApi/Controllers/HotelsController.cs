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
using MCPP.AeroBooking.Dtos.Hotels;

namespace MCPP.AeroBooking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;


        public HotelsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelListDto>>> GetHotels()
        {
            var hotels = await _context.Hotels.ToListAsync();
            var hotelDtos = _mapper.Map<List<HotelDto>>(hotels);

            return hotelDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HotelDetailsDto>> GetHotel(int id)
        {
            var hotel = await _context
                                 .Hotels
                                 .Include(hotel => hotel.Rooms)
                                 .SingleOrDefaultAsync(hotel => hotel.Id == id);

          if (Hotel == null)
          {
              return NotFound();
          }
            var hotelDto = _mapper.Map<HotelDetailsDto>(hotel);

            return hotelDto;
        }

        [HttpPost]
        public async Task<IActionResult> CreateHotel(HotelDto hotelDto)
        {
            var hotel = _mapper.Map<Hotel>(hotelDto);
            
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            hotelDto.Id = hotel.Id;

            return CreatedAtAction("GetHotel", new { id = hotel.Id }, hotelDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HotelDto>> GetEditHotel(int id)
        {
            var hotel = await _context
                                .Hotels
                                .Include(hotel => hotel.Rooms)
                                .SingleOrDefaultAsync(hotel => hotel.Id == id);

            if (hotel == null)
            {
                return NotFound();
            }

            var hotelDto = _mapper.Map<HotelDto>(hotel);

            return hotelDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditHotel(int id, HotelDto hotelDto)
        {
            if (id != hotelDto.Id)
            {
                return BadRequest();
            }

            var hotel = _mapper.Map<Hotel>(hotelDto);
            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private
        private bool HotelExists(int id)
        {
            return (_context.Hotels?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion
    }
}
