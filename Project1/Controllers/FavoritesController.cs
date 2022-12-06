﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

//***THIS SHOULD BE A WORKING FAVORITES MODEL ONCE ID IS AVAILABLE***//

//namespace Project1.Controllers
//{
//    [Route("NeedsRoute/[controller]")]
//    [ApiController]
//    public class FavoritesController : Controller
//    {
//        private readonly AdoptionCenterContext _context;

//        public FavoritesController(AdoptionCenterContext context)
//        {
//            _context = context;
//        }

//        // GET: NeedsRoute/Favorites
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
//        {
//            return await _context.Favorites.ToListAsync();
//        }

//        // GET: NeedsRoute/Favorites/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Favorite>> GetFavorite(int id)
//        {
//            var favorite = await _context.Favorites.FindAsync(id);

//            if (favorite == null)
//            {
//                return NotFound();
//            }

//            return favorite;
//        }

//        // PUT: NeedsRoute/Favorites/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutFavorite(int id, Favorite favorite)
//        {
//            if (id != favorite.Id)
//            {
//                return BadRequest();
//            }

//            _context.Entry(favorite).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!FavoriteExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: NeedsRoute/Favorites
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<Favorite>> PostFavorite(Favorite favorite)
//        {
//            _context.Favorites.Add(favorite);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction("GetFavorite", new { id = favorite.Id }, favorite);
//        }

//        // DELETE: NeedsRoute/Favorites/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteFavorite(int id)
//        {
//            var favorite = await _context.Favorites.FindAsync(id);
//            if (favorite == null)
//            {
//                return NotFound();
//            }

//            _context.Favorites.Remove(favorite);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool FavoriteExists(int id)
//        {
//            return _context.Favorites.Any(e => e.Id == id);
//        }
//    }
//}

