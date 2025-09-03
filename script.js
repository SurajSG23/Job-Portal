
function Redirect(){
    window.location.href = "components/homepage.html"
}
document.addEventListener("DOMContentLoaded", () => {


  const menuButtons = document.querySelectorAll(".menu-button");

  menuButtons.forEach(button => {
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

  function closeAllMenus() {
    menuButtons.forEach(btn => btn.setAttribute("aria-expanded", "false"));
=======
  const jobList = document.getElementById("job-list");
  const jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(card => {
    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      saveJobOrder();
    });
  });

  jobList.addEventListener("dragover", e => {
    e.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(jobList, e.clientY);
    if (afterElement == null) {
      jobList.appendChild(draggingCard);
    } else {
      jobList.insertBefore(draggingCard, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".job-card:not(.dragging)")];
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
    const order = [...jobList.querySelectorAll(".job-card")].map(card => card.textContent);
    localStorage.setItem("jobOrder", JSON.stringify(order));
  }

  // Load saved order
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

  
  const filterPanel = document.getElementById("filter-panel");
  const pinBtn = document.getElementById("pin-panel");
  const resizeBtn = document.getElementById("resize-panel");

  pinBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("pinned");
    localStorage.setItem("panelPinned", filterPanel.classList.contains("pinned"));
  });

  resizeBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("resized");
    localStorage.setItem("panelResized", filterPanel.classList.contains("resized"));
  });

  // Restore filter panel state
  if (localStorage.getItem("panelPinned") === "true") {
    filterPanel.classList.add("pinned");
  }
  if (localStorage.getItem("panelResized") === "true") {
    filterPanel.classList.add("resized");

  }
});
=======
=======
  const lazyImages = document.querySelectorAll("img.lazy-image");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");  
        img.onload = () => img.classList.add("fade-in"); 
        observer.unobserve(img); 
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  lazyImages.forEach(img => {
    img.onerror = () => {
      img.src = "assets/placeholder.png";
    };
  });
});



console.log("Script loaded");
 document.addEventListener("DOMContentLoaded", () => {
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


document.addEventListener("DOMContentLoaded", function () {
  const messagesContainer = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendButton = document.getElementById("chatbot-send");

  const jobData = [
    { title: "Frontend Developer", location: "Remote" },
    { title: "Backend Engineer", location: "New York" },
    { title: "UI/UX Designer", location: "Remote" },
    { title: "Data Analyst", location: "San Francisco" }
  ];

 
  let conversation = JSON.parse(sessionStorage.getItem("chatConversation")) || [];

  conversation.forEach(msg => addMessage(msg.text, msg.sender));

  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chatbot-message", sender);
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    conversation.push({ text, sender });
    sessionStorage.setItem("chatConversation", JSON.stringify(conversation));
  }

  function botReply(userText) {
    let lowerText = userText.toLowerCase();

    if (lowerText.includes("job") || lowerText.includes("developer")) {
      const matchedJobs = jobData.filter(job =>
        lowerText.includes(job.title.toLowerCase().split(" ")[0])
      );
      if (matchedJobs.length > 0) {
        addMessage(`Here are some jobs you might like: ${matchedJobs.map(j => `${j.title} (${j.location})`).join(", ")}`, "bot");
      } else {
        addMessage("I found some great roles: " + jobData.map(j => `${j.title} (${j.location})`).join(", "), "bot");
      }
    } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      addMessage("Hi there! How can I help you find a job today?", "bot");
    } else if (lowerText.includes("thanks")) {
      addMessage("You're welcome! 😊", "bot");
    } else {
      addMessage("I'm not sure about that, but I can help you search for jobs. Try asking for 'developer jobs' or 'remote work'.", "bot");
    }
  }

  function handleUserInput() {
    const userText = inputField.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    inputField.value = "";

    setTimeout(() => botReply(userText), 500); // Simulate typing delay
  }

  sendButton.addEventListener("click", handleUserInput);
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleUserInput();
  });

  if (conversation.length === 0) {
    addMessage("Hello! I'm your Job Junction Assistant. What kind of job are you looking for?", "bot");
  }
});
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
// Theme toggle (works across all pages)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("theme-icon");
function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    document.body.classList.remove("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}
const darkMode = localStorage.getItem("theme") === "dark";
setTheme(darkMode);
if (themeToggle) {
  themeToggle.onclick = () => {
    const isDark = !document.body.classList.contains("dark");
    setTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
}

// Multilevel dropdown for mobile
document.querySelectorAll('.nav-menu .dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
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
document.addEventListener('click', function(e) {
  document.querySelectorAll('.nav-menu .dropdown.open').forEach(drop => {
    if (!drop.contains(e.target)) drop.classList.remove('open');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


document.querySelectorAll('.menu-item > a[aria-haspopup="true"]').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    closeAllSubmenus();
    if (!expanded) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.nextElementSibling.hidden = false;
    }
  });

  trigger.addEventListener('keydown', e => {
    const submenu = trigger.nextElementSibling;
    if (!submenu) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        submenu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        submenu.querySelector('[role="menuitem"]').focus();
        break;
      case 'Escape':
        e.preventDefault();
        submenu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
        break;
    }
  });
});

document.addEventListener('keydown', e => {
  const active = document.activeElement;
  if (active.getAttribute('role') === 'menuitem') {
    const items = Array.from(active.closest('[role="menu"], [role="menubar"]').querySelectorAll('[role="menuitem"]'));
    const index = items.indexOf(active);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      items[(index + 1) % items.length].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length].focus();
    }
  }
});

function closeAllSubmenus() {
  document.querySelectorAll('.menu-item > a[aria-haspopup="true"]').forEach(link => {
    link.setAttribute('aria-expanded', 'false');
  });
  document.querySelectorAll('.submenu').forEach(sub => sub.hidden = true);
}


document.addEventListener('click', e => {
  if (!e.target.closest('.menu')) {
    closeAllSubmenus();
  }
});


// Forgot password link styling should be placed in your CSS file, not here.
// Remove this CSS block from the JS file.
=======
const menuLinks = document.querySelectorAll('[role="menuitem"]');

menuLinks.forEach(link => {
  link.addEventListener('keydown', e => {
    const parentMenu = link.closest('[role="menubar"], [role="menu"]');
    const menuItems = [...parentMenu.querySelectorAll('[role="menuitem"]')];
    const currentIndex = menuItems.indexOf(link);

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        menuItems[(currentIndex + 1) % menuItems.length].focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        menuItems[(currentIndex - 1 + menuItems.length) % menuItems.length].focus();
        break;
      case 'ArrowDown':
        if (link.getAttribute('aria-haspopup') === 'true') {
          e.preventDefault();
          const submenu = link.nextElementSibling;
          submenu.hidden = false;
          link.setAttribute('aria-expanded', 'true');
          submenu.querySelector('[role="menuitem"]').focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        const submenu = link.closest('[role="menu"]');
        if (submenu) {
          submenu.hidden = true;
          const parentLink = submenu.previousElementSibling;
          parentLink.setAttribute('aria-expanded', 'false');
          parentLink.focus();
        }
        break;
    }
  });
});
