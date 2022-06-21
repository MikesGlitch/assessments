using System;
using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Entities
{
    public class IncidentType
    {
        public Guid Id { get; set; }
        public string RecordNumber { get; set; }
        public string Description { get; set; }
        public int DateOriginal { get; set; }
        public string Section { get; set; }
        public List<ImpactType> ImpactTypes { get; set; } = new();
        public List<EventType> EventTypes { get; set; } = new();
        public string Action { get; set; }
        public string Finding { get; set; }
        public int Status { get; set; }
        public int DateModified { get; set; }

        public bool UpdateFrom(IncidentType incidentType)
        {
            RecordNumber = incidentType.RecordNumber;
            Description = incidentType.Description;
            DateOriginal = incidentType.DateOriginal;
            Section = incidentType.Section;
            Action = incidentType.Action;
            Finding = incidentType.Finding;
            Status = incidentType.Status;
            DateOriginal = incidentType.DateOriginal;

            var updateImpactTypesResult = AddUpdateImpactTypes(incidentType, this);
            var updateEventTypesResult = AddUpdateEventTypes(incidentType, this);

            return updateEventTypesResult && updateImpactTypesResult;
        }

        private static bool AddUpdateEventTypes(IncidentType incidentType, IncidentType existingIncidentType)
        {
            if (!incidentType.EventTypes.Any())
            {
                return true;
            }

            var newEventTypes = incidentType.EventTypes
                .Where(im => im.Id == Guid.Empty)
                .ToList();

            foreach (var newEventType in newEventTypes)
            {
                newEventType.IncidentTypeId = incidentType.Id;
            }

            existingIncidentType.EventTypes.AddRange(newEventTypes);

            var updatedEventTypes = incidentType.EventTypes
                .Where(im => im.Id != Guid.Empty)
                .ToList();

            if (!updatedEventTypes.Any())
            {
                return true;
            }

            var eventTypeIds = updatedEventTypes.Select(im => im.Id).ToList();

            var existingEventTypes = existingIncidentType.EventTypes
                .Where(im => eventTypeIds.Contains(im.Id))
                .ToList();

            if (existingEventTypes.Count != updatedEventTypes.Count)
            {
                return false;
            }

            foreach (var updatedEventType in updatedEventTypes)
            {
                updatedEventType.IncidentTypeId = incidentType.Id;
            }

            existingIncidentType.EventTypes.RemoveAll(im => eventTypeIds.Contains(im.Id));
            existingIncidentType.EventTypes.AddRange(updatedEventTypes);

            return true;
        }

        private bool AddUpdateImpactTypes(IncidentType incidentType, IncidentType existingIncidentType)
        {
            if (!incidentType.ImpactTypes.Any())
            {
                return true;
            }

            var newImpactTypes = incidentType.ImpactTypes
                .Where(im => im.Id == Guid.Empty)
                .ToList();

            foreach (var newImpactType in newImpactTypes)
            {
                newImpactType.IncidentTypeId = incidentType.Id;
            }

            existingIncidentType.ImpactTypes.AddRange(newImpactTypes);

            var updatedImpactTypes = incidentType.ImpactTypes
                .Where(im => im.Id != Guid.Empty)
                .ToList();

            if (!updatedImpactTypes.Any())
            {
                return true;
            }

            var impactTypeIds = updatedImpactTypes.Select(im => im.Id).ToList();

            var existingImpactTypes = existingIncidentType.ImpactTypes
                .Where(im => impactTypeIds.Contains(im.Id))
                .ToList();

            if (existingImpactTypes.Count != updatedImpactTypes.Count)
            {
                return false;
            }

            foreach (var updatedImpactType in updatedImpactTypes)
            {
                updatedImpactType.IncidentTypeId = incidentType.Id;
            }

            existingIncidentType.ImpactTypes.RemoveAll(im => impactTypeIds.Contains(im.Id));
            existingIncidentType.ImpactTypes.AddRange(updatedImpactTypes);

            return true;
        }
    }

    public class ImpactType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid IncidentTypeId { get; set; }

        public void UpdateFrom(ImpactType impactType)
        {
            Name = impactType.Name;
        }
    }

    public class EventType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid IncidentTypeId { get; set; }

        public void UpdateFrom(EventType eventType)
        {
            Name = eventType.Name;
        }
    }
}