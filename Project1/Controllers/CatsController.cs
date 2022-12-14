using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatsController : ControllerBase
    {
        private readonly AdoptionCenterContext _context;

        public CatsController(AdoptionCenterContext context)
        {
            _context = context;
        }

        // GET: api/Cats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cat>>> GetCats()
        {
            return await _context.Cats.ToListAsync();
        }

        // GET: api/Cats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cat>> GetCat(int id)
        {
            var cat = await _context.Cats.FindAsync(id);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }
		// GET: api/Cats/add/5
		[HttpGet("addPoint/{id}")]
		public async Task<ActionResult<Cat>> AddPoints(int id)
		{
			var cat = await _context.Cats.FindAsync(id);
            

			if (cat == null)
			{
				return NotFound();
			}
			cat.Points++;
			_context.Cats.Update(cat);

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CatExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return cat;
		}

		// PUT: api/Cats/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutCat(int id, Cat cat)
        {
            if (id != cat.PetId)
            {
                return BadRequest();
            }

            _context.Entry(cat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatExists(id))
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

        // POST: api/Cats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cat>> PostCat(Cat cat)
        {
			Console.WriteLine("posting " + cat.PetId);
			_context.Cats.Add(cat);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CatExists(cat.PetId))
                {
                    // return Conflict();
                }
                else
                {
                    throw;
                }
            }
            Console.WriteLine("posted " + cat.PetId);
            return CreatedAtAction("GetCat", new { id = cat.PetId }, cat);
        }

		// POST: api/Cats/withPoint
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost("withPoint")]
		public async Task<ActionResult<Cat>> PostCatWithPoint(Cat cat)
		{
			Console.WriteLine("posting " + cat.PetId);
            cat.Points = 1;
			_context.Cats.Add(cat);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (CatExists(cat.PetId))
				{
					// return Conflict();
				}
				else
				{
					throw;
				}
			}
			Console.WriteLine("posted " + cat.PetId);
			return CreatedAtAction("GetCat", new { id = cat.PetId }, cat);
		}


		// DELETE: api/Cats/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCat(int id)
        {
            var cat = await _context.Cats.FindAsync(id);
            if (cat == null)
            {
                return NotFound();
            }

            _context.Cats.Remove(cat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CatExists(int id)
        {
            return _context.Cats.Any(e => e.PetId == id);
        }
    }
}
