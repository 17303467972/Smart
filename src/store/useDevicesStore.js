import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDevicesStore = defineStore("devices", () => {
  const list = ref([])

  const add = (value) => {
    list.value.push({ ...value })
  }

  const updateData = (index, updatedData) => {
    list.value[index] = { ...updatedData }
  }

  const deleteData = (index) => {
    list.value.splice(index, 1)
  }

  return {
    list,
    add,
    updateData,
    deleteData
  }
}, {
  persist: true
})

export default useDevicesStore
