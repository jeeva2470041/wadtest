
<script setup>
import { ref } from 'vue'
import { useStudentStore } from '../stores/studentstores'

const store = useStudentStore()
const name = ref('')

function addStudent() {
  if (name.value.trim()) {
    store.addStudent(name.value)
    name.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="addStudent">
    <input
      v-model="name"
      placeholder="Enter student name"
    />

    <button type="submit">Add Student</button>
  </form>
</template>
