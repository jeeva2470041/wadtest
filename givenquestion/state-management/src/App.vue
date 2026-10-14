
<script setup>
import AddStudent from './components/addstudent.vue'
import StudentList from './components/studentlist.vue'
</script>

<template>
  <main>
    <h1>Student State Management</h1>
    <AddStudent />

    <StudentList />
  </main>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f1f5f9;
}

main {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  background: white;
  border-radius: 8px;
}

input {
  padding: 10px;
  margin-right: 8px;
}

button {
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
}
</style>
