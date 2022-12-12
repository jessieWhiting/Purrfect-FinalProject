using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Project1.Models;



namespace Project1.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        private readonly AdoptionCenterContext _context;

        public FavoritesController(AdoptionCenterContext context)
        {
            _context = context;
        }

        // GET: /api/Favorites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
        {
            return await _context.Favorites.ToListAsync();
        }

        // GET: /api/Favorites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favorite>> GetFavorite(int id)
        {
            var favorite = await _context.Favorites.FindAsync(id);

            if (favorite == null)
            {
                return NotFound();
            }

            return favorite;
        }
        // get: /api/Favorites/User/id
        [HttpGet("User/{id}")]
        public async Task<IEnumerable<Favorite>> GetFavoriteByUser(int id)
        {
            var favoriteList = await _context.Favorites.ToListAsync();
			var favByUser = favoriteList.Where(x => x.UserId == id);

			if (favByUser == null)
			{
				return (IEnumerable<Favorite>)NotFound();

			}

            return favByUser;
        }

        // PUT: /api/Favorites/5
      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavorite(int id, Favorite favorite)
        {
            if (id != favorite.FavoriteId)
            {
                return BadRequest();
            }

            _context.Entry(favorite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteExists(id))
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

        // POST: /api/Favorites
    
        [HttpPost]
        public async Task<ActionResult<Favorite>> PostFavorite(Favorite favorite)
        {
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavorite", new { id = favorite.CatId }, favorite);
        }

        // DELETE: /api/Favorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            var favorite = await _context.Favorites.FindAsync(id);
            if (favorite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavoriteExists(int id)
        {
            return _context.Favorites.Any(e => e.CatId == id);
        }
    }
}

