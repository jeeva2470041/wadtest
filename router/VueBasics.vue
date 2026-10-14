<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

/* ============================================================
   1. REACTIVE STATE (ref & reactive)
   ============================================================ */
// ref() is best for primitives (number, string, boolean)
const message = ref('Welcome to Vue 3!')
const count = ref(0)
const isVisible = ref(true)
const rawHtml = ref('<span style="color: #10b981; font-weight: bold;">Rendered via v-html</span>')

// reactive() is best for complex objects
const user = reactive({
  name: 'Priya',
  role: 'Student',
  department: 'Computer Science',
  isActive: true
})

// Form binding state (v-model)
const formData = reactive({
  username: '',
  gender: 'Female',
  frameworks: ['Vue 3'],
  selectedCourse: 'WAD',
  agreedToTerms: false
})

// Dynamic list for v-for
const items = ref([
  { id: 1, text: 'Learn Vue 3 Basics', done: true },
  { id: 2, text: 'Understand Pinia Store', done: true },
  { id: 3, text: 'Configure Vue Router', done: false },
  { id: 4, text: 'Connect Spring Boot REST API', done: false }
])
const newItemText = ref('')

/* ============================================================
   2. COMPUTED PROPERTIES (Cached, reactive derivations)
   ============================================================ */
const completedCount = computed(() => {
  return items.value.filter((i) => i.done).length
})

const progressPercentage = computed(() => {
  if (items.value.length === 0) return 0
  return Math.round((completedCount.value / items.value.length) * 100)
})

const uppercaseMessage = computed(() => {
  return message.value.toUpperCase()
})

/* ============================================================
   3. WATCHERS (Side-effects on reactive state change)
   ============================================================ */
const watchLog = ref('Watcher waiting for count changes...')

watch(count, (newVal, oldVal) => {
  watchLog.value = `Count changed from ${oldVal} to ${newVal} at ${new Date().toLocaleTimeString()}`
})

/* ============================================================
   4. METHODS / EVENT HANDLERS
   ============================================================ */
function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) count.value--
}

function resetCount() {
  count.value = 0
}

function addItem() {
  if (!newItemText.value.trim()) return
  items.value.push({
    id: Date.now(),
    text: newItemText.value.trim(),
    done: false
  })
  newItemText.value = ''
}

function removeItem(id) {
  items.value = items.value.filter((item) => item.id !== id)
}

function toggleVisibility() {
  isVisible.value = !isVisible.value
}

/* ============================================================
   5. LIFECYCLE HOOKS
   ============================================================ */
const mountedTimestamp = ref('')

onMounted(() => {
  mountedTimestamp.value = new Date().toLocaleTimeString()
  console.log('VueBasics component mounted successfully!')
})
</script>

<template>
  <main class="vue-basics-container">
    <header class="header">
      <h1>Vue 3 Composition API Essentials</h1>
      <p>A structured demonstration of Vue 3 core concepts: reactivity, directives, computed, watchers, and forms.</p>
      <small v-if="mountedTimestamp" class="mounted-badge">
        Component mounted at: {{ mountedTimestamp }} (onMounted)
      </small>
    </header>

    <!-- SECTION 1: REACTIVITY & INTERPOLATION -->
    <section class="card">
      <h2>1. Reactivity &amp; Data Binding (<code>ref</code> &amp; <code>reactive</code>)</h2>
      <p class="desc">Using <code>{{ '{{ message }}' }}</code> interpolation and reactive variables.</p>

      <div class="demo-box">
        <p><strong>Message:</strong> {{ message }}</p>
        <p><strong>Computed Uppercase:</strong> {{ uppercaseMessage }}</p>
        <p><strong>Raw HTML (<code>v-html</code>):</strong> <span v-html="rawHtml"></span></p>

        <div class="counter-widget">
          <p><strong>Reactive Counter:</strong> <span class="count-display">{{ count }}</span></p>
          <div class="btn-group">
            <button @click="increment">+ Increment</button>
            <button @click="decrement" class="btn-secondary">- Decrement</button>
            <button @click="resetCount" class="btn-danger">Reset</button>
          </div>
          <p class="watch-text"><strong>Watcher Output:</strong> {{ watchLog }}</p>
        </div>
      </div>
    </section>

    <!-- SECTION 2: CONDITIONAL RENDERING -->
    <section class="card">
      <h2>2. Conditional Rendering (<code>v-if</code>, <code>v-else</code> &amp; <code>v-show</code>)</h2>
      <p class="desc">
        <code>v-if</code> conditionally inserts/removes elements from the DOM.<br>
        <code>v-show</code> toggles the element's CSS <code>display</code> property.
      </p>

      <div class="demo-box">
        <button @click="toggleVisibility">
          Toggle Visibility (Currently: {{ isVisible ? 'Visible' : 'Hidden' }})
        </button>

        <div v-if="isVisible" class="alert-box success">
          <strong>v-if:</strong> This block is mounted in the DOM when <code>isVisible === true</code>.
        </div>
        <div v-else class="alert-box warning">
          <strong>v-else:</strong> This block appears when <code>isVisible === false</code>.
        </div>

        <div v-show="isVisible" class="alert-box info">
          <strong>v-show:</strong> This block uses <code>display: none</code> when false (stays in DOM).
        </div>
      </div>
    </section>

    <!-- SECTION 3: LIST RENDERING (v-for) -->
    <section class="card">
      <h2>3. List Rendering &amp; Computed Progress (<code>v-for</code> &amp; <code>computed</code>)</h2>
      <p class="desc">Iterating over arrays with <code>v-for="(item, index) in items" :key="item.id"</code>.</p>

      <div class="demo-box">
        <!-- Add Item Form -->
        <form @submit.prevent="addItem" class="add-form">
          <input
            v-model="newItemText"
            type="text"
            placeholder="Add new task (press Enter or click Add)..."
            required
          />
          <button type="submit">+ Add Task</button>
        </form>

        <!-- Progress Summary via Computed -->
        <div class="progress-bar-container">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <p class="progress-text">
          Progress: {{ completedCount }} of {{ items.length }} completed ({{ progressPercentage }}%)
        </p>

        <!-- Dynamic List -->
        <ul class="task-list">
          <li v-for="item in items" :key="item.id" :class="{ 'done-task': item.done }">
            <label class="task-label">
              <input type="checkbox" v-model="item.done" />
              <span>{{ item.text }}</span>
            </label>
            <button @click="removeItem(item.id)" class="btn-delete" title="Delete">✕</button>
          </li>
          <li v-if="items.length === 0" class="empty-state">No items found. Add one above!</li>
        </ul>
      </div>
    </section>

    <!-- SECTION 4: TWO-WAY DATA BINDING (v-model) -->
    <section class="card">
      <h2>4. Two-Way Form Binding (<code>v-model</code>)</h2>
      <p class="desc">Synchronizing form input elements with reactive state automatically.</p>

      <div class="demo-box form-grid">
        <!-- Form Controls -->
        <div class="form-inputs">
          <div class="input-group">
            <label>Name (Text):</label>
            <input v-model="formData.username" type="text" placeholder="Enter student name" />
          </div>

          <div class="input-group">
            <label>Course (Select Dropdown):</label>
            <select v-model="formData.selectedCourse">
              <option value="WAD">Web Application Development (WAD)</option>
              <option value="CC">Cloud Computing (CC)</option>
              <option value="AI">Artificial Intelligence (AI)</option>
            </select>
          </div>

          <div class="input-group">
            <label>Gender (Radio buttons):</label>
            <div class="radio-row">
              <label><input type="radio" value="Female" v-model="formData.gender" /> Female</label>
              <label><input type="radio" value="Male" v-model="formData.gender" /> Male</label>
              <label><input type="radio" value="Other" v-model="formData.gender" /> Other</label>
            </div>
          </div>

          <div class="input-group">
            <label>Technologies (Checkboxes):</label>
            <div class="checkbox-row">
              <label><input type="checkbox" value="Vue 3" v-model="formData.frameworks" /> Vue 3</label>
              <label><input type="checkbox" value="Pinia" v-model="formData.frameworks" /> Pinia</label>
              <label><input type="checkbox" value="Spring Boot" v-model="formData.frameworks" /> Spring Boot</label>
            </div>
          </div>

          <div class="input-group">
            <label class="terms-label">
              <input type="checkbox" v-model="formData.agreedToTerms" />
              I agree to course guidelines
            </label>
          </div>
        </div>

        <!-- Live Reactive Output -->
        <div class="form-preview">
          <h4>Live Reactive State (v-model Preview):</h4>
          <pre><code>{{ JSON.stringify(formData, null, 2) }}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 5: CLASS & STYLE BINDING -->
    <section class="card">
      <h2>5. Class &amp; Style Binding (<code>:class</code> &amp; <code>:style</code>)</h2>
      <p class="desc">Dynamically applying CSS classes and inline styles based on reactive state.</p>

      <div class="demo-box">
        <button
          @click="user.isActive = !user.isActive"
          :class="['status-btn', user.isActive ? 'btn-active' : 'btn-inactive']"
        >
          User Status: {{ user.isActive ? 'ACTIVE' : 'INACTIVE' }} (Click to toggle)
        </button>

        <p :style="{ color: user.isActive ? '#10b981' : '#ef4444', fontWeight: 'bold', marginTop: '10px' }">
          • Dynamic inline color applied via <code>:style="{ color: ... }"</code>
        </p>
      </div>
    </section>

    <footer class="footer">
      <router-link to="/" class="nav-back">← Back to Main App</router-link>
    </footer>
  </main>
</template>

<style scoped>
.vue-basics-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1e293b;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.2rem;
  color: #0f172a;
  margin-bottom: 8px;
}

.header p {
  color: #64748b;
  font-size: 1.05rem;
}

.mounted-badge {
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-top: 10px;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h2 {
  font-size: 1.35rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
  margin-bottom: 8px;
}

.card h2 code {
  color: #2563eb;
  background: #eff6ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.desc {
  color: #64748b;
  font-size: 0.92rem;
  margin-bottom: 16px;
}

.demo-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px;
}

/* Buttons */
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}

button:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #64748b;
}
.btn-secondary:hover {
  background: #475569;
}

.btn-danger {
  background: #ef4444;
}
.btn-danger:hover {
  background: #dc2626;
}

.btn-group {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.counter-widget {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #cbd5e1;
}

.count-display {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2563eb;
  margin-left: 6px;
}

.watch-text {
  font-size: 0.85rem;
  color: #0d9488;
  font-family: monospace;
}

/* Alerts */
.alert-box {
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 0.92rem;
}

.alert-box.success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.alert-box.warning {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.alert-box.info {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

/* Tasks / List */
.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

input[type="text"], select {
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  flex: 1;
}

.progress-bar-container {
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
  margin: 12px 0 6px 0;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 14px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 6px;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 1;
}

.done-task span {
  text-decoration: line-through;
  color: #94a3b8;
}

.btn-delete {
  background: transparent;
  color: #94a3b8;
  padding: 4px 8px;
  font-size: 0.9rem;
}

.btn-delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.empty-state {
  color: #94a3b8;
  text-align: center;
  font-style: italic;
}

/* Forms Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 650px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.input-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group label {
  font-size: 0.88rem;
  font-weight: 500;
}

.radio-row, .checkbox-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.terms-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.form-preview pre {
  background: #0f172a;
  color: #38bdf8;
  padding: 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  overflow-x: auto;
}

/* Status Button */
.status-btn {
  padding: 10px 18px;
  font-weight: bold;
}
.btn-active {
  background: #10b981;
}
.btn-active:hover {
  background: #059669;
}
.btn-inactive {
  background: #ef4444;
}
.btn-inactive:hover {
  background: #dc2626;
}

.footer {
  text-align: center;
  margin-top: 30px;
}

.nav-back {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}
.nav-back:hover {
  text-decoration: underline;
}
</style>
