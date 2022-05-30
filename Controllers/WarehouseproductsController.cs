using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIReactAuth.Data;
using APIReactAuth.Models;

namespace InventoryWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseproductsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public WarehouseproductsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Warehouseproducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warehouseproduct>>> GetWarehouseproducts()
        {
            if (_context.Warehouseproducts == null)
            {
                return NotFound();
            }
            return await _context.Warehouseproducts.ToListAsync();
        }

        // GET: api/Warehouseproducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouseproduct>> GetWarehouseproduct(int id)
        {
            if (_context.Warehouseproducts == null)
            {
                return NotFound();
            }
            var warehouseproduct = await _context.Warehouseproducts.FindAsync(id);

            if (warehouseproduct == null)
            {
                return NotFound();
            }

            return warehouseproduct;
        }

        // PUT: api/Warehouseproducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouseproduct(int id, Warehouseproduct warehouseproduct)
        {
            if (id != warehouseproduct.WarehouseId)
            {
                return BadRequest();
            }

            _context.Entry(warehouseproduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseproductExists(id))
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

        // POST: api/Warehouseproducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Warehouseproduct>> PostWarehouseproduct(Warehouseproduct warehouseproduct)
        {
            if (_context.Warehouseproducts == null)
            {
                return Problem("Entity set 'NorthwindContext.Warehouseproducts'  is null.");
            }
            _context.Warehouseproducts.Add(warehouseproduct);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WarehouseproductExists(warehouseproduct.WarehouseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWarehouseproduct", new { id = warehouseproduct.WarehouseId }, warehouseproduct);
        }

        // DELETE: api/Warehouseproducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouseproduct(int id)
        {
            if (_context.Warehouseproducts == null)
            {
                return NotFound();
            }
            var warehouseproduct = await _context.Warehouseproducts.FindAsync(id);
            if (warehouseproduct == null)
            {
                return NotFound();
            }

            _context.Warehouseproducts.Remove(warehouseproduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseproductExists(int id)
        {
            return (_context.Warehouseproducts?.Any(e => e.WarehouseId == id)).GetValueOrDefault();
        }
    }
}
