import { defineStore } from 'pinia'

const API_URL = 'http://localhost:8081/api/students'

export const useStudentStore = defineStore('student', {
  state: () => ({
    // Student management state
    students: [],
    name: '',
    editingId: null,
    loading: false,
    error: null,

    // Basic counter state (for generic tests)
    count: 0
  }),

  getters: {
    studentCount: (state) => state.students.length,
    isEditing: (state) => state.editingId !== null,
    getStudentById: (state) => (id) => state.students.find((s) => s.id === id),
    doubleCount: (state) => state.count * 2
  },

  actions: {
    // GET: Fetch all students
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch students')
        }
        this.students = await response.json()
      } catch (err) {
        this.error = err.message
        console.error('Error fetching students:', err)
      } finally {
        this.loading = false
      }
    },

    // POST / PUT: Create or update student
    async saveStudent() {
      if (!this.name.trim()) return

      const isEditing = this.editingId !== null
      const url = isEditing
        ? `${API_URL}/${encodeURIComponent(this.editingId)}`
        : API_URL
      const method = isEditing ? 'PUT' : 'POST'

      const studentData = {
        name: this.name.trim()
      }

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(studentData)
        })

        if (!response.ok) {
          throw new Error('Failed to save student')
        }

        this.resetForm()
        await this.fetchStudents()
      } catch (err) {
        this.error = err.message
        console.error('Error saving student:', err)
      }
    },

    // Populate form for editing
    editStudent(student) {
      this.editingId = student.id
      this.name = student.name
    },

    // DELETE: Delete student by ID
    async deleteStudent(id) {
      if (!confirm('Are you sure you want to delete this student?')) return

      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(id)}`,
          { method: 'DELETE' }
        )

        if (!response.ok) {
          throw new Error('Failed to delete student')
        }

        if (this.editingId === id) {
          this.resetForm()
        }

        await this.fetchStudents()
      } catch (err) {
        this.error = err.message
        console.error('Error deleting student:', err)
      }
    },

    // Reset form fields
    resetForm() {
      this.name = ''
      this.editingId = null
    },

    // Basic actions (for generic Pinia tests)
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})

// Aliases for convenience
export const useStore = useStudentStore
export const useMainStore = useStudentStore
export default useStudentStore
