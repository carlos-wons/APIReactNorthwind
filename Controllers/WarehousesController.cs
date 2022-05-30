using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIReactAuth.Data;
using APIReactAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace InventoryWebApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WarehousesController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public WarehousesController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Warehouses
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warehouse>>> GetWarehouses()
        {
            if (_context.Warehouses == null)
            {
                return NotFound();
            }
            return await _context.Warehouses.ToListAsync();
        }

        // GET: api/Warehouses/5
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouse>> GetWarehouse(int id)
        {
            if (_context.Warehouses == null)
            {
                return NotFound();
            }
            var warehouse = await _context.Warehouses.FindAsync(id);

            if (warehouse == null)
            {
                return NotFound();
            }

            return warehouse;
        }

        // PUT: api/Warehouses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouse(int id, Warehouse warehouse)
        {
            if (id != warehouse.WarehouseId)
            {
                return BadRequest();
            }

            _context.Entry(warehouse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseExists(id))
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

        // POST: api/Warehouses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult<Warehouse>> PostWarehouse(Warehouse warehouse)
        {
            if (_context.Warehouses == null)
            {
                return Problem("Entity set 'NorthwindContext.Warehouses'  is null.");
            }
            _context.Warehouses.Add(warehouse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWarehouse", new { id = warehouse.WarehouseId }, warehouse);
        }

        // DELETE: api/Warehouses/5
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouse(int id)
        {
            if (_context.Warehouses == null)
            {
                return NotFound();
            }
            var warehouse = await _context.Warehouses.FindAsync(id);
            if (warehouse == null)
            {
                return NotFound();
            }

            _context.Warehouses.Remove(warehouse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseExists(int id)
        {
            return (_context.Warehouses?.Any(e => e.WarehouseId == id)).GetValueOrDefault();
        }
    }
}
