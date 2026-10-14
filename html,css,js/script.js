/* ==========================================================================
   JAVASCRIPT BASICS TO INTERMEDIATE - MASTER SCRIPT
   Works in Browser and Node.js environments (with DOM safety guards)
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. VARIABLES & SCOPING (let, const, var)
// --------------------------------------------------------------------------
const APP_TITLE = "WAD JavaScript Guide"; // Block-scoped, read-only constant
let currentYear = 2026;                   // Block-scoped, reassignable variable
var legacyCount = 0;                      // Function-scoped (legacy, avoid in modern code)

// --------------------------------------------------------------------------
// 2. DATA TYPES
// --------------------------------------------------------------------------
const primitiveTypes = {
  string: "Hello, JavaScript",
  number: 42,
  float: 3.14159,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  bigIntValue: 9007199254740991n,
  symbolValue: Symbol("uniqueId")
};

// --------------------------------------------------------------------------
// 3. FUNCTIONS (Declarations, Arrow Functions & Closures)
// --------------------------------------------------------------------------
// Standard Function Declaration (Hoisted)
function calculateTotal(price, taxRate = 0.05) {
  return price + price * taxRate;
}

// Arrow Function (ES6)
const isPassingGrade = (score) => score >= 50;

// Rest Parameters (...args)
const sumAll = (...numbers) => numbers.reduce((sum, n) => sum + n, 0);

// Closure Function (Encapsulation of private state)
function createCounter(initialValue = 0) {
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

// --------------------------------------------------------------------------
// 4. ARRAYS & ESSENTIAL ARRAY METHODS
// --------------------------------------------------------------------------
const students = [
  { id: 101, name: "Priya", score: 92, major: "CS" },
  { id: 102, name: "Arun",  score: 64, major: "IT" },
  { id: 103, name: "Kiran", score: 88, major: "CS" },
  { id: 104, name: "Divya", score: 45, major: "ECE" }
];

// .map() -> Transforms into array of names
const studentNames = students.map((s) => s.name);

// .filter() -> Only students who passed (score >= 50)
const passingStudents = students.filter((s) => s.score >= 50);

// .reduce() -> Calculates total and average score
const totalScore = students.reduce((acc, curr) => acc + curr.score, 0);
const averageScore = totalScore / students.length;

// .find() -> First student with score > 90
const topScorer = students.find((s) => s.score > 90);

// .some() & .every()
const hasFailing = students.some((s) => s.score < 50);   // true
const allPassed = students.every((s) => s.score >= 50);  // false

// --------------------------------------------------------------------------
// 5. OBJECTS, DESTRUCTURING & SPREAD OPERATOR
// --------------------------------------------------------------------------
const studentProfile = {
  id: 101,
  name: "Priya",
  semester: 6,
  address: {
    city: "Chennai",
    country: "India"
  }
};

// Destructuring with renaming and default values
const { name: studentName, semester, gpa = 3.8 } = studentProfile;

// Optional Chaining (?.) & Nullish Coalescing (??)
const zipCode = studentProfile.address?.zipCode ?? "600001";

// Spread Operator for cloning & merging
const updatedProfile = {
  ...studentProfile,
  status: "Active",
  lastUpdated: new Date().toISOString()
};

// --------------------------------------------------------------------------
// 6. ES6 CLASSES & OBJECT-ORIENTED PROGRAMMING (OOP)
// --------------------------------------------------------------------------
class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDetails() {
    return `${this.name} (${this.email})`;
  }
}

class StudentRecord extends Person {
  constructor(name, email, rollNo, marks) {
    super(name, email); // Call parent constructor
    this.rollNo = rollNo;
    this.marks = marks;
  }

  getDetails() {
    return `${super.getDetails()} - Roll No: ${this.rollNo}, Marks: ${this.marks}`;
  }

  isDistinction() {
    return this.marks >= 75;
  }
}

// --------------------------------------------------------------------------
// 7. CLIENT-SIDE FORM VALIDATION HELPER
// --------------------------------------------------------------------------
function validateRegistrationForm(name, email, password) {
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }

  if (!email || !emailPattern.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// --------------------------------------------------------------------------
// 8. ASYNC JAVASCRIPT & FETCH API
// --------------------------------------------------------------------------
// Simple Promise-based delay utility
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Async/Await function to fetch data
async function fetchStudentsApi(url = "http://localhost:8081/api/students") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    throw error;
  }
}

// --------------------------------------------------------------------------
// 9. WEB STORAGE HELPERS (Browser-only)
// --------------------------------------------------------------------------
const StorageHelper = {
  save(key, value) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  load(key, defaultValue = null) {
    if (typeof localStorage !== "undefined") {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    }
    return defaultValue;
  },

  remove(key) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }
};

// --------------------------------------------------------------------------
// 10. DOM MANIPULATION & EVENTS (Browser-only)
// --------------------------------------------------------------------------
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log(`${APP_TITLE} loaded successfully in browser!`);
  });
}

// Export for module systems (Node / ES modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateTotal,
    isPassingGrade,
    sumAll,
    createCounter,
    students,
    StudentRecord,
    validateRegistrationForm,
    StorageHelper
  };
}
