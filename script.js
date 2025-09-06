// Cleaned and fixed script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  // =======================
  // THEME TOGGLE (WORKS ACROSS SITE)
  // =======================
  function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !dark);
      themeIcon.classList.toggle("fa-sun", dark);
    }
  }

  // Read theme from localStorage and apply
  const darkMode = localStorage.getItem("theme") === "dark";
  setTheme(darkMode);

  // Listen for theme toggle button click
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = () => {
      const isDark = !document.body.classList.contains("dark");
      setTheme(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  }

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
  // BACK TO TOP BUTTON
  // =======================
  const backToTopBtn = document.getElementById("backToTop") || document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display =
        document.documentElement.scrollTop > 200 ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

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
    if (!jobList || !loader) return;
    loader.style.display = "block";
    setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        jobList.innerHTML += generateJobCard(jobCount);
        jobCount++;
      }
      loader.style.display = "none";
    }, 1000);
  }
  if (jobList && loader) loadJobs();

  // =======================
  // CHATBOT
  // =======================
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot");
  const messages = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  let greeted = false;
  function appendMessage(sender, text) {
    if (!messages) return;
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  if (toggleBtn && chatbot && inputField) {
    toggleBtn.addEventListener("click", () => {
      chatbot.style.display = "flex";
      toggleBtn.setAttribute("aria-expanded", "true");
      inputField.focus();
      if (!greeted) {
        appendMessage("Bot", "Hello! How can I help you today?");
        greeted = true;
      }
    });
  }

  if (closeBtn && chatbot && toggleBtn) {
    closeBtn.addEventListener("click", () => {
      chatbot.style.display = "none";
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    });
  }

  if (sendBtn && inputField) {
    sendBtn.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  function sendMessage() {
    if (!inputField || !messages) return;
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
    if (input.includes("apply")) return "Click on a job card to view details and apply.";
    return "I'm here to help with job-related queries!";
  }

  // =======================
  // SIGN-IN / SIGN-UP TOGGLE
  // =======================
  let sign_in_btn = document.querySelector(".sign-in");
  let sign_up_btn = document.querySelector(".sign-up");
  let sign_up_section = document.querySelector(".sign-section");
  let sign_in_section = document.querySelector(".sign-section-2");

  if (sign_in_btn && sign_up_section && sign_in_section) {
    sign_in_btn.addEventListener("click", () => {
      sign_up_section.style.visibility = "hidden";
      sign_in_section.style.visibility = "visible";
    });
  }
  if (sign_up_btn && sign_up_section && sign_in_section) {
    sign_up_btn.addEventListener("click", () => {
      sign_in_section.style.visibility = "hidden";
      sign_up_section.style.visibility = "visible";
    });
  }

  window.guestLogin = function () {
    window.location.href = "components/homepage.html";
  };

  // =======================
  // MULTILEVEL DROPDOWN FOR MOBILE
  // =======================
  document.querySelectorAll('.nav-menu .dropdown > a').forEach(link => {
    link.addEventListener('click', function (e) {
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('dropdown-content')) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const parentLi = this.parentElement.parentElement.querySelectorAll('.dropdown.open');
          parentLi.forEach(li => {
            if (li !== this.parentElement) li.classList.remove('open');
          });
          this.parentElement.classList.toggle('open');
        }
      }
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-menu .dropdown.open').forEach(drop => {
      if (!drop.contains(e.target)) drop.classList.remove('open');
    });
  });

  // =======================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // =======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =======================
  // SAVE JOBS
  // =======================
  const saveButtons = document.querySelectorAll(".save-job-btn");
  const savedJobsContainer = document.getElementById("saved-jobs-container");
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  if (savedJobsContainer) {
    savedJobs.forEach(job => {
      const jobDiv = document.createElement("div");
      jobDiv.className = "job-card";
      jobDiv.innerHTML = job;
      savedJobsContainer.appendChild(jobDiv);
    });
  }
  saveButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const jobCard = this.parentElement.outerHTML;
      savedJobs.push(jobCard);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      this.disabled = true;
      this.innerText = "✅ Saved";
    });
  });

  // =======================
  // JOB ALERT MODAL
  // =======================
  const jobAlertForm = document.getElementById('jobAlertForm');
  const alertKeywordInput = document.getElementById('alertKeyword');
  const simulateJobBtn = document.getElementById('simulateJobBtn');
  const modal = document.getElementById('jobAlertModal');
  const closeBtn = document.querySelector('.close-btn');
  const alertMessage = document.getElementById('alertMessage');

  if (jobAlertForm && alertKeywordInput) {
    jobAlertForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const keyword = alertKeywordInput.value.trim();
      if (keyword) {
        localStorage.setItem('jobAlertKeyword', keyword);
        alert(`Subscribed for alerts with keyword: ${keyword}`);
        alertKeywordInput.value = '';
      }
    });
  }
  if (simulateJobBtn && modal && alertMessage) {
    simulateJobBtn.addEventListener('click', function () {
      const savedKeyword = localStorage.getItem('jobAlertKeyword');
      if (savedKeyword) {
        alertMessage.textContent = `New job matching "${savedKeyword}" is available!`;
        modal.style.display = 'block';
      } else {
        alert('No alert preferences found. Please subscribe first.');
      }
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // =======================
  // APPLICATION FORM & HISTORY
  // =======================
  const form = document.getElementById("applicationForm");
  const historyDiv = document.getElementById("applicationHistory");
  function loadApplications() {
    if (!historyDiv) return;
    historyDiv.innerHTML = "";
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    if (applications.length === 0) {
      historyDiv.innerHTML = "<p>No applications yet.</p>";
      return;
    }
    applications.forEach(app => {
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
  if (form && historyDiv) {
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
          resumeData: reader.result
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
    loadApplications();
  }

  // =======================
  // USER PROFILE LOGIC
  // =======================
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
    if (users.find(user => user.username === username)) {
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
    const foundUser = users.find(user => user.username === username && user.password === password);
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
    const newUsername = document.getElementById("profile-new-username").value.trim();
    if (!newUsername) {
      alert("Please enter a new username.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (users.find(user => user.username === newUsername)) {
      alert("Username already exists.");
      return;
    }
    users = users.map(user => {
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
  window.logout = function () {
    localStorage.removeItem("currentUser");
    location.reload();
  };
});
