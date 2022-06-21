import { StatusType } from './StatusType'

export interface TagType {
  id?: string
  incidentTypeId?: string
  name: string
}

export interface IncidentType {
  id?: string
  recordNumber: string
  description: string
  dateOriginal: number
  section: string
  impactTypes: TagType[]
  eventTypes: TagType[]
  action: string
  finding: string
  status: number
  dateModified: number
}

export interface IncidentTypeFormData {
  description: string
  dateOriginal?: number
  section?: { [name: string]: boolean }
  impactTypes: string[]
  eventTypes: string[]
  status?: StatusType
}
