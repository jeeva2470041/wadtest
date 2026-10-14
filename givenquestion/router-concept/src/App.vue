<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="container">
    <h1>Vue Router Application</h1>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>

    <hr>

    <RouterView />
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 25px;
  background: white;
  border-radius: 8px;
}

nav {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

nav a {
  text-decoration: none;
  color: #2563eb;
}

nav a.router-link-active {
  font-weight: bold;
  color: #dc2626;
}
</style>