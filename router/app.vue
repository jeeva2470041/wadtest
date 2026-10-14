<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:8081/api/students'

const students = ref([])
const name = ref('')
const editingId = ref(null)

// GET: Fetch all students
async function getStudents() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Failed to fetch students')
    }

    students.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

// POST: Add a student
// PUT: Update a student
async function saveStudent() {
  if (!name.value.trim()) {
    return
  }

  const isEditing = editingId.value !== null

  const url = isEditing
    ? `${API_URL}/${encodeURIComponent(editingId.value)}`
    : API_URL

  const method = isEditing ? 'PUT' : 'POST'

  const studentData = {
    name: name.value.trim()
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

    resetForm()
    await getStudents()
  } catch (error) {
    console.error(error)
  }
}

// Load student details into the form
function editStudent(student) {
  editingId.value = student.id
  name.value = student.name
}

// DELETE: Delete a student
async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) {
    return
  }

  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    )

    if (!response.ok) {
      throw new Error('Failed to delete student')
    }

    if (editingId.value === id) {
      resetForm()
    }

    await getStudents()
  } catch (error) {
    console.error(error)
  }
}

// Reset the form
function resetForm() {
  name.value = ''
  editingId.value = null
}

onMounted(getStudents)
</script>

<template>
  <main class="container">
    <h1>Student Management</h1>

    <section class="card">
      <h2>
        {{ editingId !== null ? 'Update Student' : 'Add Student' }}
      </h2>

      <form @submit.prevent="saveStudent">
        <label for="name">Student Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Enter student name"
          required
        />

        <button type="submit">
          {{ editingId !== null ? 'Update Student' : 'Add Student' }}
        </button>

        <button
          v-if="editingId !== null"
          type="button"
          class="cancel"
          @click="resetForm"
        >
          Cancel
        </button>
      </form>
    </section>

    <section class="card">
      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>
              <button @click="editStudent(student)">Edit</button>
              <button
                class="delete"
                @click="deleteStudent(student.id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="students.length === 0">
            <td colspan="3">No students found.</td>
          </tr>
        </tbody>
      </table>

      <button class="refresh" @click="getStudents">
        Refresh Students
      </button>
    </section>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  color: #333;
}

.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.card {
  background: white;
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #00000010;
}

h2 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
}

button {
  padding: 9px 14px;
  border: none;
  border-radius: 5px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  margin: 3px;
}

button:hover {
  background: #1d4ed8;
}

.cancel {
  background: #64748b;
}

.delete {
  background: #dc2626;
}

.delete:hover {
  background: #b91c1c;
}

.refresh {
  margin-top: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f1f5f9;
}

@media (max-width: 600px) {
  .container {
    margin: 15px auto;
    padding: 12px;
  }

  .card {
    padding: 14px;
    overflow-x: auto;
  }

  table {
    min-width: 450px;
  }
}
</style>