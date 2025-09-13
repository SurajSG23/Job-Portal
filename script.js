function Redirect() {
  window.location.href = "components/homepage.html";
}

// All page logic should be inside ONE DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded and DOM is ready.");

=======
document.addEventListener('DOMContentLoaded', function () {
  const saveButtons = document.querySelectorAll('.save-job-btn');
  const savedJobsContainer = document.getElementById('saved-jobs-container');
  
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'job-card';
    jobDiv.innerHTML = job;
    savedJobsContainer.appendChild(jobDiv);
document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // MENU BUTTONS (ARIA)

document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // MENU BUTTONS (ARIA)
  // =======================
  const menuButtons = document.querySelectorAll(".menu-button");
  function closeAllMenus() {
    menuButtons.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }
  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      closeAllMenus();
      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
      }
    });
    button.addEventListener("keydown", (e) => {
      const submenu = button.nextElementSibling;
      if (e.key === "ArrowDown" && submenu) {
        e.preventDefault();
        button.setAttribute("aria-expanded", "true");
        submenu.querySelector("a, .menu-button")?.focus();
      }
      if (e.key === "Escape") {
        closeAllMenus();
        button.focus();
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-nav")) {
      closeAllMenus();
    }
  });

  // =======================
  // JOB CARD DRAG & DROP
  // =======================
  const jobList = document.getElementById("job-list");
  if (jobList) {
    const jobCards = document.querySelectorAll(".job-card");
    jobCards.forEach((card) => {
      card.addEventListener("dragstart", () => {
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        saveJobOrder();
      });
    });
    jobList.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingCard = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(jobList, e.clientY);
      if (draggingCard) {
        if (afterElement == null) {
          jobList.appendChild(draggingCard);
        } else {
          jobList.insertBefore(draggingCard, afterElement);
        }
      }
    });
    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".job-card:not(.dragging)"),
      ];
      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
    function saveJobOrder() {
      const order = [...jobList.querySelectorAll(".job-card")].map(
        (card) => card.textContent
      );
      localStorage.setItem("jobOrder", JSON.stringify(order));
    }
    function loadJobOrder() {
      const savedOrder = JSON.parse(localStorage.getItem("jobOrder"));
      if (savedOrder) {
        savedOrder.forEach((text) => {
          const card = [...document.querySelectorAll(".job-card")].find(
            (c) => c.textContent === text
          );
          if (card) jobList.appendChild(card);
        });
      }
    }
    }
    function loadJobOrder() {
      const savedOrder = JSON.parse(localStorage.getItem("jobOrder"));
      if (savedOrder) {
        savedOrder.forEach(text => {
          const card = [...document.querySelectorAll(".job-card")].find(c => c.textContent === text);
          if (card) jobList.appendChild(card);
        });
      }
    }
    loadJobOrder();
  }

  // =======================
  // FILTER PANEL
  // =======================
  const filterPanel = document.getElementById("filter-panel");
  const pinBtn = document.getElementById("pin-panel");
  const resizeBtn = document.getElementById("resize-panel");
  if (filterPanel && pinBtn && resizeBtn) {
    pinBtn.addEventListener("click", () => {
      filterPanel.classList.toggle("pinned");
      localStorage.setItem(
        "panelPinned",
        filterPanel.classList.contains("pinned")
      );
    });
    resizeBtn.addEventListener("click", () => {
      filterPanel.classList.toggle("resized");
      localStorage.setItem(
        "panelResized",
        filterPanel.classList.contains("resized")
      );
    });
    // Restore filter panel state
    if (localStorage.getItem("panelPinned") === "true") {
      filterPanel.classList.add("pinned");
    }
    if (localStorage.getItem("panelResized") === "true") {
      filterPanel.classList.add("resized");
    }
  }

  // =======================
  // LAZY IMAGE LOADING
  // =======================
  const lazyImages = document.querySelectorAll("img.lazy-image");
  if (lazyImages.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.onload = () => img.classList.add("fade-in");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => observer.observe(img));
    lazyImages.forEach((img) => {
      img.onerror = () => {
        img.src = "assets/placeholder.png";
      };
    });
  }

  // =======================
  // THEME TOGGLE (WORKS ACROSS SITE)
  // (Removed duplicate variable-only block)
  // =======================

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeToggle = document.getElementById("themeToggle") || document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("themeIcon") || document.getElementById("theme-icon");
  // THEME TOGGLE (WORKS ACROSS SITE)
  // ======================

  function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !dark);
      themeIcon.classList.toggle("fa-sun", dark);
    }
  }
  const darkMode = localStorage.getItem("theme") === "dark";
  setTheme(darkMode);


  // Listen for theme toggle button click
  const themeToggle =
    document.getElementById("themeToggle") ||
    document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.onclick = () => {
      const isDark = !document.body.classList.contains("dark");
      setTheme(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  }
  // Persistent Dark Theme Across All Pages
  document.addEventListener("DOMContentLoaded", () => {
    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem("jobPortalTheme") || "light";
    applyTheme(savedTheme);

    // Theme toggle button logic
    const themeToggle = document.getElementById("theme-toggle") || document.getElementById("themeToggle");
    const themeIcon = document.getElementById("theme-icon") || document.getElementById("themeIcon");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark");
        const newTheme = isDark ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("jobPortalTheme", newTheme);
      });
    }

    function applyTheme(theme) {
      if (theme === "dark") {
        document.body.classList.add("dark");
        if (themeIcon) {
          themeIcon.className = "fas fa-sun";
        }
      } else {
        document.body.classList.remove("dark");
        if (themeIcon) {
          themeIcon.className = "fas fa-moon";
        }
      }
    }
  });
  // ============
  // MOBILE NAVIGATION TOGGLE
  // =======================
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });
  }

  // =======================
  // MULTILEVEL DROPDOWN FOR MOBILE
  // =======================
  document.querySelectorAll(".nav-menu .dropdown > a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains("dropdown-content")) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const parentLi =
            this.parentElement.parentElement.querySelectorAll(".dropdown.open");
          parentLi.forEach((li) => {
            if (li !== this.parentElement) li.classList.remove("open");
          });
          this.parentElement.classList.toggle("open");
        }
      }
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-menu .dropdown.open").forEach((drop) => {
      if (!drop.contains(e.target)) drop.classList.remove("open");
    });
  });

  // =======================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // =======================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

  // MOBILE NAVIGATION TOGGLE
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ======================
  // NAVBAR TOGGLE
  // =======================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }

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
  // BACK TO TOP BUTTON
  // =======================
  const backToTopBtn =
    document.getElementById("backToTop") ||
    document.getElementById("backToTopBtn");
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
  // SIGN IN / SIGN UP TOGGLE
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
  // SAVE JOBS
  // (This is the complete, functional version)
  // =======================
  const saveButtons = document.querySelectorAll(".save-job-btn");
  const savedJobsContainer = document.getElementById("saved-jobs-container");
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  if (savedJobsContainer) {
    // First, render jobs that are already saved in localStorage
    savedJobs.forEach((job) => {
      const jobDiv = document.createElement("div");
      jobDiv.className = "job-card";
      jobDiv.innerHTML = job;
      savedJobsContainer.appendChild(jobDiv);
    });
    
    // Then, add listeners to all save buttons on the page
    saveButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const jobCard = this.parentElement.outerHTML; // Assuming button is direct child of card
        savedJobs.push(jobCard);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        this.disabled = true;
        this.innerText = "✅ Saved";
      });
    });
  }

  // =======================
  // CHATBOT
  // =======================
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot");
  const messages = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");
  const closeBtn = document.getElementById("chatbot-close");
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
    if (input.includes("apply"))
      return "Click on a job card to view details and apply.";
    return "I'm here to help with job-related queries!";
  }
  // =======================
  // JOB ALERT MODAL
  // =======================

  const jobAlertForm = document.getElementById("jobAlertForm");
  const alertKeywordInput = document.getElementById("alertKeyword");
  const simulateJobBtn = document.getElementById("simulateJobBtn");
  const modal = document.getElementById("jobAlertModal");
  const closeModalBtn = document.querySelector(".close-btn");
  const alertMessage = document.getElementById("alertMessage");
  const jobAlertForm = document.getElementById('jobAlertForm');
  const alertKeywordInput = document.getElementById('alertKeyword');
  const simulateJobBtn = document.getElementById('simulateJobBtn');
  const modal = document.getElementById('jobAlertModal');
  const alertMessage = document.getElementById('alertMessage');
  const closeModalBtn = document.querySelector('.close-btn');
  const closeModalBtn = document.querySelector('.close-btn');
  const alertMessage = document.getElementById('alertMessage');

  if (jobAlertForm && alertKeywordInput) {
    jobAlertForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const keyword = alertKeywordInput.value.trim();
      if (keyword) {
        localStorage.setItem("jobAlertKeyword", keyword);
        alert(`Subscribed for alerts with keyword: ${keyword}`);
        alertKeywordInput.value = "";
      }
    });
  }
  if (simulateJobBtn && modal && alertMessage) {
    simulateJobBtn.addEventListener("click", function () {
      const savedKeyword = localStorage.getItem("jobAlertKeyword");
      if (savedKeyword) {
        alertMessage.textContent = `New job matching "${savedKeyword}" is available!`;
        modal.style.display = "block";
      } else {
        alert("No alert preferences found. Please subscribe first.");
      }
    });
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

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
          resumeData: reader.result,
        };
        let applications =
          JSON.parse(localStorage.getItem("applications")) || [];
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

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    showProfile(currentUser.username);
  }

  // Note: These functions (register, login, showProfile, etc.) are defined inside
  // DOMContentLoaded, so they cannot be called from an "onclick" attribute in HTML.
  // You must add event listeners instead (e.g., document.getElementById('login-btn').addEventListener('click', login);)
  
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
    // These checks prevent errors if elements don't exist on the current page
    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");
    const profileSection = document.getElementById("profile-section");
    const profileUsername = document.getElementById("profile-username");

    if (loginSection) loginSection.style.display = "none";
    if (registerSection) registerSection.style.display = "none";
    if (profileSection) profileSection.style.display = "block";
    if (profileUsername) profileUsername.innerText = username;
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

    users = users.map(user => {
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

  // Make logout function global so it can be called from HTML onclick
  window.logout = function () {
    localStorage.removeItem("currentUser");
    location.reload();
  };

  const browseJobsBtn = document.querySelector('.get-started-btn, .btn-primary.get-started-btn');
  const postJobBtn = document.querySelector('.post-job-btn, .btn-ghost.post-job-btn');
  if (browseJobsBtn) {
    browseJobsBtn.addEventListener('click', function (e) {
      // Direct navigation to job seeker page
      window.location.href = "components/seeker.html";
    });
  }
  if (postJobBtn) {
    postJobBtn.addEventListener('click', function (e) {
      // Direct navigation to job posting page
      window.location.href = "components/employer-post.html";
    });
  }
});

console.log("Script loaded");
console.log("Script loaded");

// =======================
// LOADING INDICATOR FOR DYNAMIC CONTENT
// =======================

// Create loading spinner element
function createLoadingSpinner() {
  let spinner = document.getElementById("loading-spinner");
  if (!spinner) {
    spinner = document.createElement("div");
    spinner.id = "loading-spinner";
    spinner.setAttribute("role", "status");
    spinner.setAttribute("aria-live", "polite");
    spinner.style.position = "fixed";
    spinner.style.top = "50%";
    spinner.style.left = "50%";
    spinner.style.transform = "translate(-50%, -50%)";
    spinner.style.zIndex = "9999";
    spinner.style.background = "rgba(255,255,255,0.8)";
    spinner.style.borderRadius = "1rem";
    spinner.style.padding = "2rem";
    spinner.style.boxShadow = "0 4px 24px rgba(102,126,234,0.15)";
    spinner.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:48px;height:48px;border:6px solid #667eea;border-top:6px solid #764ba2;border-radius:50%;animation:spin 1s linear infinite;"></div>
        <span style="margin-top:1rem;color:#3d55b4;font-weight:600;font-size:1.1rem;">Loading...</span>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      </style>
    `;
    document.body.appendChild(spinner);
  }
  spinner.style.display = "block";
}

function removeLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) spinner.style.display = "none";
}

// Example usage for dynamic fetch (replace with your actual fetch logic)
function fetchDynamicContent(url, callback) {
  createLoadingSpinner();
  // Simulate async fetch (replace with real fetch)
  setTimeout(() => {
    // ...fetch logic here...
    removeLoadingSpinner();
    if (typeof callback === "function") callback();
  }, 1500);
}

// Example: Show spinner when loading job listings
const jobList = document.getElementById("job-list");
if (jobList) {
  // Simulate dynamic fetch on page load
  createLoadingSpinner();
  setTimeout(() => {
    // After fetching jobs, remove spinner
    removeLoadingSpinner();
    // ...existing job rendering logic...
  }, 1200);
}

// You can wrap any async operation with createLoadingSpinner() and removeLoadingSpinner()
// For accessibility, the spinner uses role="status" and aria-live="polite"


  // Example of how to attach listeners if your buttons don't use onclick=""
  const loginBtn = document.getElementById("login-button"); // Assuming you have buttons with these IDs
  const registerBtn = document.getElementById("register-button");
  const updateProfileBtn = document.getElementById("update-profile-button");

  if(loginBtn) loginBtn.addEventListener('click', login);
  if(registerBtn) registerBtn.addEventListener('click', register);
  if(updateProfileBtn) updateProfileBtn.addEventListener('click', updateProfile);

}); // <-- This is the single, correct closing bracket for the main DOMContentLoaded listener
// Send email notification function (using mailto for demonstration)
function sendEmailNotification(to, subject, body) {
  const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}


const panel = document.getElementById("filterPanel");
const toggleBtn = document.getElementById("togglePanel");
const closeBtn = document.getElementById("closePanel");
const resizer = document.querySelector(".resizer");

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;

(function restoreState() {
  const savedState = JSON.parse(localStorage.getItem("panelState"));
  if (savedState) {
    panel.style.top = savedState.top;
    panel.style.left = savedState.left;
    panel.style.width = savedState.width;
    panel.style.height = savedState.height;
    panel.style.display = savedState.visible ? "flex" : "none";
  }
})();


function saveState() {
  const state = {
    top: panel.style.top,
    left: panel.style.left,
    width: panel.style.width,
    height: panel.style.height,
    visible: panel.style.display !== "none"
  };
  localStorage.setItem("panelState", JSON.stringify(state));
}


panel.querySelector(".panel-header").addEventListener("mousedown", (e) => {
  if (e.target === closeBtn) return; // skip if clicking close
  isDragging = true;
  offsetX = e.clientX - panel.offsetLeft;
  offsetY = e.clientY - panel.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    panel.style.left = e.clientX - offsetX + "px";
    panel.style.top = e.clientY - offsetY + "px";
  }
  if (isResizing) {
    panel.style.width = e.clientX - panel.offsetLeft + "px";
    panel.style.height = e.clientY - panel.offsetTop + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging || isResizing) saveState();
  isDragging = false;
  isResizing = false;
});


resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  e.stopPropagation();
});

toggleBtn.addEventListener("click", () => {
  panel.style.display = panel.style.display === "none" ? "flex" : "none";
  saveState();
});


closeBtn.addEventListener("click", () => {
  panel.style.display = "none";
  saveState();
});

// Forgot password link styling should be placed in your CSS file, not here.
// Remove this CSS block from the JS file.
const menuLinks = document.querySelectorAll('[role="menuitem"]');


menuLinks.forEach(link => {
  link.addEventListener('keydown', e => {
    const parentMenu = link.closest('[role="menubar"], [role="menu"]');
    const menuItems = [...parentMenu.querySelectorAll('[role="menuitem"]')];
    const currentIndex = menuItems.indexOf(link);
// Example usage: Call this function where you want to trigger the email notification
// sendEmailNotification('recipient@example.com', 'Job Portal Notification', 'Your action was successful!');

console.log("Script loaded");
