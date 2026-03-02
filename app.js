const defaultMotivationLines = [
  "Small progress is still progress. Bloom one page at a time.",
  "Your future self will thank you for today's focused hour.",
  "Discipline is a love letter to your goals.",
  "Focus softly, breathe deeply, keep going.",
  "You don't need perfect days; you need consistent ones.",
];

const ADMIN_USER = "ria";
const ADMIN_PASS = "bloomstudy123";

function loadState(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getMotivationLines() {
  return loadState("motivationLines", defaultMotivationLines);
}

function initPlanner() {
  const todoForm = document.getElementById("todoForm");
  if (!todoForm) return;

  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  const syllabusInput = document.getElementById("syllabusInput");
  const hoursInput = document.getElementById("hoursInput");
  const energyInput = document.getElementById("energyInput");
  const energyValue = document.getElementById("energyValue");
  const planLength = document.getElementById("planLength");
  const scheduleOutput = document.getElementById("scheduleOutput");
  const motivationQuote = document.getElementById("motivationQuote");

  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const generateScheduleBtn = document.getElementById("generateScheduleBtn");

  const timerDisplay = document.getElementById("timerDisplay");
  const pomodoroLabel = document.getElementById("pomodoroLabel");
  const startTimerBtn = document.getElementById("startTimerBtn");
  const pauseTimerBtn = document.getElementById("pauseTimerBtn");
  const resetTimerBtn = document.getElementById("resetTimerBtn");

  let todos = loadState("todos", []);
  let timer = {
    mode: "focus",
    secondsLeft: 25 * 60,
    intervalId: null,
  };

  function pickQuote() {
    const lines = getMotivationLines();
    const index = Math.floor(Math.random() * lines.length);
    motivationQuote.textContent = `“${lines[index]}”`;
  }

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.done ? "done" : ""}`;

      const text = document.createElement("span");
      text.textContent = todo.text;

      const actions = document.createElement("div");
      actions.className = "row";

      const toggleBtn = document.createElement("button");
      toggleBtn.className = "btn btn-secondary";
      toggleBtn.textContent = todo.done ? "Undo" : "Done";
      toggleBtn.type = "button";
      toggleBtn.onclick = () => {
        todo.done = !todo.done;
        saveState("todos", todos);
        renderTodos();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-ghost";
      deleteBtn.textContent = "Delete";
      deleteBtn.type = "button";
      deleteBtn.onclick = () => {
        todos = todos.filter((item) => item.id !== todo.id);
        saveState("todos", todos);
        renderTodos();
      };

      actions.append(toggleBtn, deleteBtn);
      li.append(text, actions);
      todoList.appendChild(li);
    });
  }

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function renderTimer() {
    timerDisplay.textContent = formatTime(timer.secondsLeft);
    pomodoroLabel.textContent = timer.mode === "focus" ? "Focus Session" : "Break Session";
  }

  function resetMode(mode) {
    timer.mode = mode;
    timer.secondsLeft = mode === "focus" ? 25 * 60 : 5 * 60;
    renderTimer();
  }

  function startTimer() {
    if (timer.intervalId) return;

    timer.intervalId = setInterval(() => {
      timer.secondsLeft -= 1;

      if (timer.secondsLeft <= 0) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        const nextMode = timer.mode === "focus" ? "break" : "focus";
        resetMode(nextMode);
        alert(nextMode === "break" ? "Focus done! Take a short break 🌷" : "Break over! Back to focus 💪");
      }

      renderTimer();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }

  function buildSchedule() {
    const topics = syllabusInput.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!topics.length) {
      scheduleOutput.innerHTML = "<p>Please add syllabus topics first.</p>";
      return;
    }

    const days = Number(planLength.value);
    const hoursPerDay = Number(hoursInput.value);
    const energy = Number(energyInput.value);
    const blocksPerDay = Math.max(1, Math.round((hoursPerDay * energy) / 2));

    const plan = [];
    for (let day = 1; day <= days; day += 1) {
      const picks = [];
      for (let block = 0; block < blocksPerDay; block += 1) {
        const topicIndex = (day + block - 1) % topics.length;
        picks.push(topics[topicIndex]);
      }
      plan.push({ day, picks });
    }

    scheduleOutput.innerHTML = "";
    plan.forEach((entry) => {
      const dayEl = document.createElement("article");
      dayEl.className = "schedule-day";

      const title = document.createElement("h3");
      title.textContent = `Day ${entry.day}`;

      const details = document.createElement("p");
      details.textContent = `${entry.picks.length} block(s): ${entry.picks.join(" • ")}`;

      dayEl.append(title, details);
      scheduleOutput.appendChild(dayEl);
    });
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = todoInput.value.trim();
    if (!value) return;

    todos.push({ id: crypto.randomUUID(), text: value, done: false });
    saveState("todos", todos);
    renderTodos();
    todoForm.reset();
  });

  energyInput.addEventListener("input", () => {
    energyValue.textContent = energyInput.value;
  });

  newQuoteBtn.addEventListener("click", pickQuote);
  generateScheduleBtn.addEventListener("click", buildSchedule);
  startTimerBtn.addEventListener("click", startTimer);
  pauseTimerBtn.addEventListener("click", pauseTimer);
  resetTimerBtn.addEventListener("click", () => {
    pauseTimer();
    resetMode("focus");
  });

  pickQuote();
  renderTodos();
  renderTimer();
}

function initLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = usernameInput.value.trim().toLowerCase();
    const pass = passwordInput.value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("bs_admin_logged_in", "true");
      window.location.href = "admin.html";
      return;
    }

    loginMessage.textContent = "Invalid credentials. Please try again.";
  });
}

function initAdmin() {
  const adminRoot = document.getElementById("adminPanel");
  if (!adminRoot) return;

  if (sessionStorage.getItem("bs_admin_logged_in") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const quoteForm = document.getElementById("quoteForm");
  const quoteInput = document.getElementById("quoteInput");
  const quoteList = document.getElementById("quoteList");
  const announcementInput = document.getElementById("announcementInput");
  const saveAnnouncementBtn = document.getElementById("saveAnnouncementBtn");
  const adminMessage = document.getElementById("adminMessage");
  const logoutBtn = document.getElementById("logoutBtn");

  let lines = getMotivationLines();

  function renderLines() {
    quoteList.innerHTML = "";
    lines.forEach((line, idx) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      const text = document.createElement("span");
      text.textContent = line;
      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-ghost";
      del.textContent = "Remove";
      del.onclick = () => {
        lines = lines.filter((_, i) => i !== idx);
        saveState("motivationLines", lines.length ? lines : defaultMotivationLines);
        lines = getMotivationLines();
        renderLines();
      };
      li.append(text, del);
      quoteList.appendChild(li);
    });
  }

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = quoteInput.value.trim();
    if (!value) return;
    lines.unshift(value);
    saveState("motivationLines", lines);
    renderLines();
    quoteForm.reset();
    adminMessage.textContent = "Motivation line saved.";
  });

  const existingAnnouncement = localStorage.getItem("announcement") || "";
  announcementInput.value = existingAnnouncement;

  saveAnnouncementBtn.addEventListener("click", () => {
    localStorage.setItem("announcement", announcementInput.value.trim());
    adminMessage.textContent = "Announcement updated.";
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("bs_admin_logged_in");
    window.location.href = "login.html";
  });

  renderLines();
}

function initAnnouncementBanner() {
  const banner = document.getElementById("announcementBanner");
  if (!banner) return;
  const text = localStorage.getItem("announcement");
  if (text) {
    banner.textContent = `📣 ${text}`;
    banner.hidden = false;
  }
}

initAnnouncementBanner();
initPlanner();
initLogin();
initAdmin();
