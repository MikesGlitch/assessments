using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LookupController : ControllerBase
    {
        private readonly GeneralDbContext context;

        public LookupController(GeneralDbContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Returns a list of controls
        /// </summary>
        [HttpGet]
        [Route("Controls")]
        public IEnumerable<Control> Controls()
        {
            return context.Controls.ToList();
        }

        /// <summary>
        /// Returns a list of regions
        /// </summary>
        [HttpGet]
        [Route("Regions")]
        public IEnumerable<Region> Regions()
        {
            return context.Regions.ToList();
        }

        /// <summary>
        /// Returns a list of interfaces
        /// </summary>
        [HttpGet]
        [Route("Interfaces")]
        public IEnumerable<Interface> Interfaces()
        {
            return context.Interfaces.ToList();
        }

        /// <summary>
        /// Returns a list of languages
        /// </summary>
        [HttpGet]
        [Route("Languages")]
        public IEnumerable<Language> Languages()
        {
            return context.Languages.ToList();
        }
    }
}