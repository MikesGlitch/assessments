using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncidentTypesController : ControllerBase
    {
        private readonly GeneralDbContext _context;

        public IncidentTypesController(GeneralDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Create Incident Type
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Guid>> Create(IncidentType incidentType)
        {
            if(incidentType.Id != Guid.Empty)
            {
                return BadRequest();
            }

            var newIncidentTypeId = Guid.NewGuid();
            incidentType.Id = newIncidentTypeId;

            foreach (var impactType in incidentType.ImpactTypes)
            {
                impactType.IncidentTypeId = newIncidentTypeId;
            }

            foreach (var eventType in incidentType.EventTypes)
            {
                eventType.IncidentTypeId = newIncidentTypeId;
            }

            _context.IncidentTypes.Add(incidentType);

            await _context.SaveChangesAsync();

            return CreatedAtRoute("IncidentTypes/GetById", new { id = incidentType.Id }, incidentType.Id);
        }

        /// <summary>
        /// Create Incident Type
        /// </summary>
        [HttpPut]
        public async Task<ActionResult> Update(IncidentType incidentType)
        {
            if(incidentType.Id == Guid.Empty)
            {
                return BadRequest("Invalid incident type identifier");
            }

            var existingIncidentType = await _context.IncidentTypes
                .Include(it => it.ImpactTypes)
                .Include(it => it.EventTypes)
                .AsNoTracking()
                .SingleOrDefaultAsync(i => i.Id == incidentType.Id);

            if (existingIncidentType == default)
            {
                return NotFound();
            }

            var result = existingIncidentType.UpdateFrom(incidentType);

            if(!result)
            {
                return BadRequest("invalid data");
            }

            _context.IncidentTypes.Update(existingIncidentType);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Returns a list of Incident Types
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IncidentType>>> Get()
        {
            return await _context.IncidentTypes
                .Include(i => i.ImpactTypes)
                .Include(i => i.EventTypes)
                .ToListAsync();
        }

        /// <summary>
        /// Get Incident Type by Id
        /// </summary>
        [HttpGet("{id:guid}", Name = "IncidentTypes/GetById")]
        public async Task<ActionResult<IncidentType>> GetById(Guid id)
        {
            var incidentType = await _context.IncidentTypes
                .Include(i => i.ImpactTypes)
                .Include(i => i.EventTypes)
                .SingleOrDefaultAsync(it => it.Id == id);

            if(incidentType == default)
            {
                return NotFound();
            }

            return incidentType;
        }

        /// <summary>
        /// Delete Incident Type by Id
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var incidentType = await _context.IncidentTypes
                .Include(i => i.ImpactTypes)
                .Include(i => i.EventTypes)
                .SingleOrDefaultAsync(it => it.Id == id);

            if(incidentType == default)
            {
                return NotFound();
            }

            _context.IncidentTypes.Remove(incidentType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}