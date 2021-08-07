﻿using Blog_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : Controller
    {
        private readonly BlogDbContext _context;

        public ArticlesController(BlogDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Articles
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }

        [HttpGet("{id}")]
        // GET: Articles/Details/5
        public async Task<ActionResult<Article>> GetArticle(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var article = await _context.Articles
                .FirstOrDefaultAsync(m => m.Id == id);
            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        [Authorize]
        [Route("add")]
        [HttpGet]
        public async Task<ActionResult<Article>> AddArticle(string title, string content, string tags) // [Bind("Id,Title,Content,Date,Username")]
        {
            Article newArticle = new();

            if (title != null && content != null)
            {
                newArticle.Title = title;
                newArticle.Content = content;
                newArticle.Date = DateTime.Now.ToShortDateString();
                newArticle.UserId = 1;
                newArticle.Username = (await _context.Users.FirstOrDefaultAsync(u => u.Id == newArticle.UserId)).Username;

                var tempTags = tags.Split(" ");

                foreach (var item in tempTags)
                {
                    Tag newTag = new();
                    newTag.Content = item;
                    newArticle.Tags.Add(newTag);
                }

                _context.Articles.Add(newArticle);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetArticle", new { id = newArticle.Id }, newArticle);
            }

            return NotFound();
        }

        // GET: Articles/Edit/5
        public async Task<ActionResult<Article>> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }
            return article;
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<ActionResult<Article>> Edit(int id, [Bind("Id,Title,Content,Date,Username")] Article article)
        {
            if (id != article.Id)
            {
                return NotFound();
            }

            try
            {
                _context.Update(article);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(article.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(GetArticles));
        }

        // GET: Articles/Delete/5
        public async Task<ActionResult<Article>> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var article = await _context.Articles
                .FirstOrDefaultAsync(m => m.Id == id);
            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // POST: Articles/Delete/5
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(GetArticles));
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }

        [Route("search")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> SearchArticlesByName(string articleName)
        {
            return await _context.Articles
                                    .Where(p => p.Title.ToLower().Contains(articleName.ToLower()))
                                    .ToListAsync();
        }
    }
}
