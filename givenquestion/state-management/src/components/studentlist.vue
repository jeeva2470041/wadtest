
<script setup>
import { useStudentStore } from '../stores/studentstores'

const store = useStudentStore()
</script>

<template>
  <h2>Student List</h2>

  <p v-if="store.students.length === 0">
    No students found.
  </p>

  <ul>
    <li
      v-for="(student, index) in store.students"
      :key="index"
    >
      {{ student }}

      <button @click="store.deleteStudent(index)">
        Delete
      </button>
    </li>
  </ul>
</template>
