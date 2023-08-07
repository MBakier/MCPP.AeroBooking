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
using MCPP.AeroBooking.Dtos.Rooms;

namespace MCPP.AeroBooking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RoomsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Services

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomListDto>>> GetRooms()
        {
            var rooms = await _context.Rooms.ToListAsync();

            var roomDtos = _mapper.Map<List<RoomListDto>>(rooms);

            return roomDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDetailsDto>> GetRoom(int id)
        {
          
            var room = await _context
                                 .Rooms
                                 .SingleOrDefaultAsync(room => room.Id == id);

            if (room == null)
            {
                return NotFound();
            }

            var roomDto = _mapper.Map<RoomDetailsDto>(room);

            return roomDto;
        }

        [HttpPost]
        public async Task<ActionResult> CreateRoom(RoomDto roomDto)
        {
            var room = _mapper.Map<Room>(roomDto);
            
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            roomDto.Id = room.Id;

            return CreatedAtAction("GetRoom", new { id = room.Id }, roomDto);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditRoom(int id, RoomDto roomDto)
        {
            if (id != roomDto.Id)
            {
                return BadRequest();
            }

            var room = _mapper.Map<Room>(roomDto);
            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private
        private bool RoomExists(int id)
        {
            return (_context.Rooms?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion
    }
}
