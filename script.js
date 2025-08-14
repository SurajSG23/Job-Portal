document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  // =======================
  // NAVBAR TOGGLE
  // =======================
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // =======================
  // THEME TOGGLE
  // =======================
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeIcon.classList.toggle("fa-moon");
      themeIcon.classList.toggle("fa-sun");
    });
  }

  // =======================
  // BACK TO TOP BUTTON
  // =======================
  let mybutton = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", () => {
    mybutton.style.display =
      document.documentElement.scrollTop > 200 ? "block" : "none";
  });
  mybutton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // =======================
  // JOB CARD LOADER
  // =======================
  let jobCount = 0;
  const limit = 5;
  const jobList = document.getElementById("job-list");
  const loader = document.getElementById("loader");

  function generateJobCard(index) {
    return `
      <div class="job-card">
        <h3>Job Title ${index + 1}</h3>
        <p>Company ${index + 1}</p>
        <p>Description for job ${index + 1}</p>
      </div>`;
  }

  function loadJobs() {
    loader.style.display = "block";
    setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        jobList.innerHTML += generateJobCard(jobCount);
        jobCount++;
      }
      loader.style.display = "none";
    }, 1000);
  }
  loadJobs();

  // =======================
  // CHATBOT
  // =======================
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot");
  const closeBtn = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  let greeted = false;
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  toggleBtn?.addEventListener("click", () => {
    chatbot.style.display = "flex";
    toggleBtn.setAttribute("aria-expanded", "true");
    inputField.focus();
    if (!greeted) {
      appendMessage("Bot", "Hello! How can I help you today?");
      greeted = true;
    }
  });

  closeBtn?.addEventListener("click", () => {
    chatbot.style.display = "none";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  });

  sendBtn?.addEventListener("click", sendMessage);
  inputField?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const userMsg = inputField.value.trim();
    if (!userMsg) return;
    appendMessage("You", userMsg);
    inputField.value = "";
    setTimeout(() => {
      appendMessage("Bot", getBotReply(userMsg));
    }, 600);
  }

  function getBotReply(input) {
    input = input.toLowerCase();
    if (input.includes("hello")) return "Hi there! How can I assist you?";
    if (input.includes("job")) return "You can browse job listings below.";
    if (input.includes("apply"))
      return "Click on a job card to view details and apply.";
    return "I'm here to help with job-related queries!";
  }


  let sign_in_btn = document.querySelector(".sign-in");
  let sign_up_btn = document.querySelector(".sign-up");
  let sign_up_section = document.querySelector(".sign-section");
  let sign_in_section = document.querySelector(".sign-section-2");

  sign_in_btn?.addEventListener("click", () => {
    sign_up_section.style.visibility = "hidden";
    sign_in_section.style.visibility = "visible";
  });
  sign_up_btn?.addEventListener("click", () => {
    sign_in_section.style.visibility = "hidden";
    sign_up_section.style.visibility = "visible";
  });

  function guestLogin() {
    window.location.href = "components/homepage.html";
  }
});

function Redirect() {
  window.location.href = "components/homepage.html";
}

const jobAlertForm = document.getElementById("jobAlertForm");
const alertKeywordInput = document.getElementById("alertKeyword");
const simulateJobBtn = document.getElementById("simulateJobBtn");
const modal = document.getElementById("jobAlertModal");
const closeBtn = document.querySelector(".close-btn");
const alertMessage = document.getElementById("alertMessage");

jobAlertForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = alertKeywordInput.value.trim();
  if (keyword) {
    localStorage.setItem("jobAlertKeyword", keyword);
    alert(`Subscribed for alerts with keyword: ${keyword}`);
    alertKeywordInput.value = "";
  }
});

simulateJobBtn.addEventListener("click", function () {
  const savedKeyword = localStorage.getItem("jobAlertKeyword");
  if (savedKeyword) {
    alertMessage.textContent = `New job matching "${savedKeyword}" is available!`;
    modal.style.display = "block";
  } else {
    alert("No alert preferences found. Please subscribe first.");
  }
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", loadApplications);

const form = document.getElementById("applicationForm");
const historyDiv = document.getElementById("applicationHistory");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const resume = document.getElementById("resume").files[0];
  const status = document.getElementById("status").value;

  if (!name || !email || !jobTitle || !resume) {
    alert("Please fill all fields and upload a resume.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newApp = {
      name,
      email,
      jobTitle,
      resumeName: resume.name,
      status,
      resumeData: reader.result,
    };

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(newApp);
    localStorage.setItem("applications", JSON.stringify(applications));

    form.reset();
    loadApplications();
    alert("Application submitted successfully!");
  };
  reader.readAsDataURL(resume);
});

function loadApplications() {
  historyDiv.innerHTML = "";
  let applications = JSON.parse(localStorage.getItem("applications")) || [];

  if (applications.length === 0) {
    historyDiv.innerHTML = "<p>No applications yet.</p>";
    return;
  }

  applications.forEach((app) => {
    const card = document.createElement("div");
    card.classList.add("application-card");
    card.innerHTML = `
            <p><strong>Name:</strong> ${app.name}</p>
            <p><strong>Email:</strong> ${app.email}</p>
            <p><strong>Job Title:</strong> ${app.jobTitle}</p>
            <p><strong>Resume:</strong> ${app.resumeName}</p>
            <p class="status"><strong>Status:</strong> ${app.status}</p>
        `;
    historyDiv.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    showProfile(currentUser.username);
  }
});

function register() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((user) => user.username === username)) {
    alert("Username already taken.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now login.");
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    alert("Invalid credentials.");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  showProfile(username);
}

function showProfile(username) {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("profile-username").innerText = username;
}

function updateProfile() {
  const newUsername = document
    .getElementById("profile-new-username")
    .value.trim();
  if (!newUsername) {
    alert("Please enter a new username.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (users.find((user) => user.username === newUsername)) {
    alert("Username already exists.");
    return;
  }

  users = users.map((user) => {
    if (user.username === currentUser.username) {
      return { ...user, username: newUsername };
    }
    return user;
  });

  currentUser.username = newUsername;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  document.getElementById("profile-username").innerText = newUsername;
  alert("Profile updated!");
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const saveButtons = document.querySelectorAll(".save-job-btn");
  const savedJobsContainer = document.getElementById("saved-jobs-container");

  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  savedJobs.forEach((job) => {
    const jobDiv = document.createElement("div");
    jobDiv.className = "job-card";
    jobDiv.innerHTML = job;
    savedJobsContainer.appendChild(jobDiv);
  });

  saveButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const jobCard = this.parentElement.outerHTML;
      savedJobs.push(jobCard);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      this.disabled = true;
      this.innerText = "✅ Saved";
    });
  });
});

let sign_in_btn = document.getElementsByClassName("sign-in")[0];
let sign_up_btn = document.getElementsByClassName("sign-up")[0];
let sign_up_section = document.getElementsByClassName("sign-section")[0];
let sign_in_section = document.getElementsByClassName("sign-section-2")[0];

sign_in_btn.addEventListener("click", () => {
  sign_up_section.style.visibility = "hidden";
  sign_in_section.style.visibility = "visible";
});

sign_up_btn.addEventListener("click", () => {
  sign_in_section.style.visibility = "hidden";
  sign_up_section.style.visibility = "visible";
});

function guestLogin() {
  window.location.href = "components/homepage.html";
}
