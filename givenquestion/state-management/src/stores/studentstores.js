
import { defineStore } from 'pinia'
export const useStudentStore = defineStore('student', {
  state: () => ({
    students: ['Arun', 'Bala']
  }),

  actions: {
    addStudent(name) {
      if (name.trim()) {
        this.students.push(name.trim())
      }
    },

    deleteStudent(index) {
      this.students.splice(index, 1)
    }
  }
})

export default useStudentStore
