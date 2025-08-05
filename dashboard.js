<<<<<<< HEAD
// dashboard.js
import { auth, db } from './firebase-config.js';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any"];
let currentUserEmail = null;

// Elements
const userEmailDisplay = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const daySelect = document.getElementById('day-select');
const categorySelect = document.getElementById('category-select');
const customCategory = document.getElementById('custom-category');
const taskSections = document.getElementById('task-sections');
const summaryBtn = document.getElementById('summary-button');
const resetBtn = document.getElementById('reset-button');
const summarySection = document.getElementById('summary');

// Auth Check
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUserEmail = user.email;
    userEmailDisplay.textContent = `👤 ${currentUserEmail}`;
    renderAllDaySections();
    listenToTasks();
  } else {
    window.location.href = 'index.html';
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});

// Render All Day Sections (empty to start)
function renderAllDaySections() {
  taskSections.innerHTML = ''; // Clear existing
  days.forEach(day => {
    const section = document.createElement('section');
    section.className = 'day-section';
    section.id = `section-${day}`;
    section.innerHTML = `
      <h3 class="day-header" data-day="${day}">▶ ${day}</h3>
      <ul class="task-list" id="list-${day}"></ul>
    `;
    taskSections.appendChild(section);
  });
  setupToggleListeners();
}

// Toggle collapsible triangle
function setupToggleListeners() {
  document.querySelectorAll('.day-header').forEach(header => {
    header.addEventListener('click', () => {
      const day = header.dataset.day;
      const list = document.getElementById(`list-${day}`);
      if (list.style.display === 'none') {
        list.style.display = 'block';
        header.innerHTML = `▼ ${day}`;
      } else {
        list.style.display = 'none';
        header.innerHTML = `▶ ${day}`;
      }
    });
  });
}

// Add Task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const day = daySelect.value;
  let category = categorySelect.value;
  if (customCategory.value.trim()) category = customCategory.value.trim();

  if (!task || !day || !category || !currentUserEmail) return;

  const userDoc = doc(db, 'users', currentUserEmail);
  const userSnap = await getDoc(userDoc);
  let tasks = userSnap.exists() ? userSnap.data().tasks || [] : [];

  tasks.push({ task, day, category, done: false });
  await setDoc(userDoc, { tasks });

  taskInput.value = '';
  daySelect.selectedIndex = 0;
  categorySelect.selectedIndex = 0;
  customCategory.value = '';
});

// Load Tasks in Real-Time
function listenToTasks() {
  const userDoc = doc(db, 'users', currentUserEmail);
  onSnapshot(userDoc, (docSnap) => {
    if (docSnap.exists()) {
      const tasks = docSnap.data().tasks || [];
      renderTasks(tasks);
    }
  });
}

// Render tasks into the day sections
function renderTasks(tasks) {
  // Clear all lists
  days.forEach(day => {
    const ul = document.getElementById(`list-${day}`);
    if (ul) ul.innerHTML = '';
  });

  tasks.forEach((t, index) => {
    const ul = document.getElementById(`list-${t.day}`);
    if (!ul) return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span style="${t.done ? 'text-decoration: line-through; color: gray;' : ''}">
        [${t.category}] ${t.task}
      </span>
      <div>
        <button onclick="toggleDone(${index})" class="btn btn-status">${t.done ? 'Undo' : 'Done'}</button>
        <button onclick="deleteTask(${index})" class="btn red">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// Mark task done or undo
window.toggleDone = async function (index) {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  tasks[index].done = !tasks[index].done;
  await updateDoc(userDoc, { tasks });
};

// Delete task
window.deleteTask = async function (index) {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  tasks.splice(index, 1);
  await updateDoc(userDoc, { tasks });
};

// Show Weekly Summary
summaryBtn.addEventListener('click', async () => {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  const summary = {};

  tasks.forEach(t => {
    if (!summary[t.category]) summary[t.category] = { total: 0, done: 0 };
    summary[t.category].total += 1;
    if (t.done) summary[t.category].done += 1;
  });

  let html = '<strong>Weekly Summary</strong><ul>';
  for (const [cat, val] of Object.entries(summary)) {
    html += `<li>${cat}: ${val.done}/${val.total} done</li>`;
  }
  html += '</ul>';

  summarySection.innerHTML = html;
});

// Reset Weekly Tasks
resetBtn.addEventListener('click', async () => {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  let tasks = docSnap.data().tasks || [];
  tasks = tasks.map(t => ({ ...t, done: false }));

  await updateDoc(userDoc, { tasks });
  summarySection.innerHTML = '';
});
=======
// dashboard.js
import { auth, db } from './firebase-config.js';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any"];
let currentUserEmail = null;

// Elements
const userEmailDisplay = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const daySelect = document.getElementById('day-select');
const categorySelect = document.getElementById('category-select');
const customCategory = document.getElementById('custom-category');
const taskSections = document.getElementById('task-sections');
const summaryBtn = document.getElementById('summary-button');
const resetBtn = document.getElementById('reset-button');
const summarySection = document.getElementById('summary');

// Auth Check
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUserEmail = user.email;
    userEmailDisplay.textContent = `👤 ${currentUserEmail}`;
    renderAllDaySections();
    listenToTasks();
  } else {
    window.location.href = 'index.html';
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});

// Render All Day Sections (empty to start)
function renderAllDaySections() {
  taskSections.innerHTML = ''; // Clear existing
  days.forEach(day => {
    const section = document.createElement('section');
    section.className = 'day-section';
    section.id = `section-${day}`;
    section.innerHTML = `
      <h3 class="day-header" data-day="${day}">▶ ${day}</h3>
      <ul class="task-list" id="list-${day}"></ul>
    `;
    taskSections.appendChild(section);
  });
  setupToggleListeners();
}

// Toggle collapsible triangle
function setupToggleListeners() {
  document.querySelectorAll('.day-header').forEach(header => {
    header.addEventListener('click', () => {
      const day = header.dataset.day;
      const list = document.getElementById(`list-${day}`);
      if (list.style.display === 'none') {
        list.style.display = 'block';
        header.innerHTML = `▼ ${day}`;
      } else {
        list.style.display = 'none';
        header.innerHTML = `▶ ${day}`;
      }
    });
  });
}

// Add Task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const day = daySelect.value;
  let category = categorySelect.value;
  if (customCategory.value.trim()) category = customCategory.value.trim();

  if (!task || !day || !category || !currentUserEmail) return;

  const userDoc = doc(db, 'users', currentUserEmail);
  const userSnap = await getDoc(userDoc);
  let tasks = userSnap.exists() ? userSnap.data().tasks || [] : [];

  tasks.push({ task, day, category, done: false });
  await setDoc(userDoc, { tasks });

  taskInput.value = '';
  daySelect.selectedIndex = 0;
  categorySelect.selectedIndex = 0;
  customCategory.value = '';
});

// Load Tasks in Real-Time
function listenToTasks() {
  const userDoc = doc(db, 'users', currentUserEmail);
  onSnapshot(userDoc, (docSnap) => {
    if (docSnap.exists()) {
      const tasks = docSnap.data().tasks || [];
      renderTasks(tasks);
    }
  });
}

// Render tasks into the day sections
function renderTasks(tasks) {
  // Clear all lists
  days.forEach(day => {
    const ul = document.getElementById(`list-${day}`);
    if (ul) ul.innerHTML = '';
  });

  tasks.forEach((t, index) => {
    const ul = document.getElementById(`list-${t.day}`);
    if (!ul) return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span style="${t.done ? 'text-decoration: line-through; color: gray;' : ''}">
        [${t.category}] ${t.task}
      </span>
      <div>
        <button onclick="toggleDone(${index})" class="btn btn-status">${t.done ? 'Undo' : 'Done'}</button>
        <button onclick="deleteTask(${index})" class="btn red">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// Mark task done or undo
window.toggleDone = async function (index) {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  tasks[index].done = !tasks[index].done;
  await updateDoc(userDoc, { tasks });
};

// Delete task
window.deleteTask = async function (index) {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  tasks.splice(index, 1);
  await updateDoc(userDoc, { tasks });
};

// Show Weekly Summary
summaryBtn.addEventListener('click', async () => {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  const tasks = docSnap.data().tasks || [];
  const summary = {};

  tasks.forEach(t => {
    if (!summary[t.category]) summary[t.category] = { total: 0, done: 0 };
    summary[t.category].total += 1;
    if (t.done) summary[t.category].done += 1;
  });

  let html = '<strong>Weekly Summary</strong><ul>';
  for (const [cat, val] of Object.entries(summary)) {
    html += `<li>${cat}: ${val.done}/${val.total} done</li>`;
  }
  html += '</ul>';

  summarySection.innerHTML = html;
});

// Reset Weekly Tasks
resetBtn.addEventListener('click', async () => {
  const userDoc = doc(db, 'users', currentUserEmail);
  const docSnap = await getDoc(userDoc);
  if (!docSnap.exists()) return;

  let tasks = docSnap.data().tasks || [];
  tasks = tasks.map(t => ({ ...t, done: false }));

  await updateDoc(userDoc, { tasks });
  summarySection.innerHTML = '';
});
>>>>>>> 8557c6ac5418f44e0589173bffaafde5c1bf8bda
