using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly GeneralDbContext context;

        public RecordController(GeneralDbContext context)
        {
            this.context = context;
        }
        
        /// <summary>
        /// Returns a list of records
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="limit">Only applies a limit for values greater than -1</param>
        [HttpGet]
        public async Task<IEnumerable<Record>> Get(int offset = 0, int limit = -1)
        {
            var query = context.Records
                .Include(r => r.RecordData)
                .Skip(offset);

            if (limit > -1)
            {
                query = query.Take(limit);
            }

            return await query
                .ToListAsync();
        }

        /// <summary>
        /// Returns a record by id
        /// </summary>
        /// <response code="404">Record does not exist</response>            
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Record>> GetRecord(int id)
        {
            var record = await context.Records
                .Include(r => r.RecordData)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (record == null)
            {
                return NotFound();
            }

            return record;
        }

        /// <summary>
        /// Creates a new record
        /// </summary>
        /// <remarks>
        /// Sample Request:
        /// 
        /// ```
        /// POST /Record
        /// {
        ///     "id": 0,
        ///     "recordData": [
        ///     {
        ///         "id": 0,
        ///         "controlId": 1,
        ///         "recordId": 0,
        ///         "value": "4"
        ///     },
        ///     {
        ///         "id": 0,
        ///         "controlId": 2,
        ///         "recordId": 0,
        ///         "value": "2020-03-11"
        ///     },
        ///     {
        ///         "id": 0,
        ///         "controlId": 3,
        ///         "recordId": 0,
        ///         "value": "MyStringControlValue"
        ///     }]
        /// }
        /// ```
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Record>> PostRecord(Record record)
        {
            context.Records.Add(record);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new {id = record.Id}, record);
        }

        /// <summary>
        /// Updates an existing record
        /// </summary>
        /// <remarks>
        /// Same request body as POST /Record but using an existing record's id.
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecord(int id, Record record)
        {
            if (id != record.Id)
            {
                return BadRequest();
            }

            var existingRecord = context.Records
                .Where(p => p.Id == id)
                .Include(p => p.RecordData)
                .FirstOrDefault();

            if (existingRecord == null)
                return NotFound();

            // Update parent
            context.Entry(existingRecord).CurrentValues.SetValues(record);

            // Delete children
            foreach (var existingRecordData in existingRecord.RecordData.ToList())
            {
                if (record.RecordData.All(c => c.Id != existingRecordData.Id))
                    context.RecordData.Remove(existingRecordData);
            }

            // Update and Insert children
            foreach (var recordData in record.RecordData)
            {
                var existingRecordData = existingRecord.RecordData
                    .SingleOrDefault(c => c.Id == recordData.Id && c.Id != default(int));

                if (existingRecordData != null)
                    // Update child
                    context.Entry(existingRecordData).CurrentValues.SetValues(recordData);
                else
                {
                    // Insert child
                    recordData.Id = 0;
                    existingRecord.RecordData.Add(recordData);
                }
            }

            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Deletes an existing record
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord(int id)
        {
            var record = await context.Records.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            context.Records.Remove(record);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}