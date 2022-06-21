import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'
import { IncidentType } from '@/typings/IncidentTypes'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const API = axios.create({
  baseURL: 'https://localhost:44321',
})

export const useStoreRecords = defineStore({
  id: 'storeRecords',
  state: () => ({
    record: {} as IncidentType,
    records: [] as IncidentType[],
    isLoading: false,
  }),
  actions: {
    async addRecord(record: IncidentType) {
      await API.post('/IncidentTypes', record)
        .then(() => {
          this.getRecords()
        })
        .catch(() => alert('An error occurred'))
    },

    async getRecords() {
      this.isLoading = true
      const incidentTypesData = await API.get('/IncidentTypes').then((res: AxiosResponse<IncidentType[]>) => {
        return res.data
      })

      await delay(2000) // Fake Delay (KEEP)
      this.isLoading = false
      this.records = incidentTypesData
    },
  },
})
