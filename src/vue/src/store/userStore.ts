import { defineStore } from 'pinia'

const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: null as string | null,
  }),
  actions: {
    initUserId() {
      const userIdLocalStorageKey = 'userId'
      this.userId = window.localStorage.getItem(userIdLocalStorageKey)

      if (!this.userId) {
        this.userId = uuidv4()
        window.localStorage.setItem(userIdLocalStorageKey, this.userId)
      }
    },
  },
})
