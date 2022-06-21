using System;
using System.Linq;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class DbInitializer
    {
        public static void Initialize(GeneralDbContext context)
        {
            InitControls(context);
            InitInterfaces(context);
            InitLanguages(context);
            InitRegions(context);
            InitIncidentTypes(context);
        }

        private static void InitIncidentTypes(GeneralDbContext context)
        {
            if (context.IncidentTypes.Any())
            {
                return;
            }

            var incidentType1Id = Guid.NewGuid();
            var incidentType2Id = Guid.NewGuid();
            var incidentType3Id = Guid.NewGuid();

            var incidentTypes = new IncidentType[]
            {
                new()
                {
                    Id = incidentType1Id,
                    RecordNumber = "100",
                    Description = "Contamination event",
                    DateOriginal = 1589466514,
                    Section = "Food Production > South Africa > Meat Industry",
                    ImpactTypes = new System.Collections.Generic.List<ImpactType>
                    {
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Environment",
                            IncidentTypeId = incidentType1Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Health",
                            IncidentTypeId = incidentType1Id
                        },
                    },
                    EventTypes = new System.Collections.Generic.List<EventType>
                    {
                        new EventType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Event",
                            IncidentTypeId = incidentType1Id
                        }
                    },
                    Action = "",
                    Finding = "",
                    Status = 3,
                    DateModified = 1602685714
                },
                new()
                {
                    Id = incidentType2Id,
                    RecordNumber = "101",
                    Description = "Wind hazard",
                    DateOriginal = 1589466514,
                    Section = "Renewables Production > UK > Wind",
                    ImpactTypes = new System.Collections.Generic.List<ImpactType>
                    {
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Sustainability",
                            IncidentTypeId = incidentType2Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Safety",
                            IncidentTypeId = incidentType2Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Renewables",
                            IncidentTypeId = incidentType2Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Environment",
                            IncidentTypeId = incidentType2Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Audit",
                            IncidentTypeId = incidentType2Id
                        },                        
                    },
                    EventTypes = new System.Collections.Generic.List<EventType>
                    {
                        new EventType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Near-Miss",
                            IncidentTypeId = incidentType2Id
                        }
                    },
                    Action = "",
                    Finding = "",
                    Status = 2,
                    DateModified = 1602685714
                },
                new()
                {
                    Id = incidentType3Id,
                    RecordNumber = "102",
                    Description = "Hydro incident",
                    DateOriginal = 1589466514,
                    Section = "Renewables Production > South Africa > Hydro",
                    ImpactTypes = new System.Collections.Generic.List<ImpactType>
                    {
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Renewables",
                            IncidentTypeId = incidentType3Id
                        },
                        new ImpactType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Safety",
                            IncidentTypeId = incidentType3Id
                        },
                    },
                    EventTypes = new System.Collections.Generic.List<EventType>
                    {
                        new EventType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Incident",
                            IncidentTypeId = incidentType3Id
                        },
                        new EventType
                        {
                            Id = Guid.NewGuid(),
                            Name = "Near-Miss",
                            IncidentTypeId = incidentType3Id
                        }
                    },
                    Action = "",
                    Finding = "",
                    Status = 2,
                    DateModified = 1602685714
                }
            };

            context.IncidentTypes.AddRange(incidentTypes);
            context.SaveChanges();
        }

        private static void InitControls(GeneralDbContext context)
        {
            if (context.Controls.Any())
            {
                return;
            }

            var controls = new Control[]
            {
                new()
                {
                    Label = "Region",
                    Type = "drop-down",
                    DataUrl = "/Lookup/Regions",
                    Required = true
                },
                new()
                {
                    Label = "Incident Date",
                    Type = "date",
                    Required = true
                },
                new()
                {
                    Label = "Incident Description",
                    Type = "text",
                    Required = false
                },
            };
            
            context.Controls.AddRange(controls);
            context.SaveChanges();
        }

        private static void InitInterfaces(GeneralDbContext context)
        {
            if (context.Interfaces.Any())
            {
                return;
            }

            var interfaces = new Interface[]
            {
                new()
                {
                    Name = "EHS"
                },
                new()
                {
                    Name = "Risk Actions"
                },
                new()
                {
                    Name = "Custom Dashboard 37"
                },
            };
            
            context.Interfaces.AddRange(interfaces);
            context.SaveChanges();
        }

        private static void InitLanguages(GeneralDbContext context)
        {
            if (context.Languages.Any())
            {
                return;
            }

            var languages = new Language[]
            {
                new()
                {
                    Name = "Afrikaans"
                },
                new()
                {
                    Name = "English"
                },
                new()
                {
                    Name = "Xhosa"
                },
                new()
                {
                    Name = "French"
                },
            };
            
            context.Languages.AddRange(languages);
            context.SaveChanges();
        }

        private static void InitRegions(GeneralDbContext context)
        {
            if (context.Regions.Any())
            {
                return;
            }
            
            var regions = new Region[]
            {
                new()
                {
                    Name = "South Africa"
                },
                new()
                {
                    Name = "United Kingdoms"
                },
                new()
                {
                    Name = "United States"
                },
                new()
                {
                    Name = "Australia"
                },
            };
            
            context.Regions.AddRange(regions);
            context.SaveChanges();
        }
    }
}