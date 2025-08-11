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

  sign_in_btn?.addEventListener("click", () => {
    sign_up_section.style.visibility = "hidden";
    sign_in_section.style.visibility = "visible";
  });
  sign_up_btn?.addEventListener("click", () => {
    sign_in_section.style.visibility = "hidden";
    sign_up_section.style.visibility = "visible";
  });

  // =======================
  // SAVE JOBS
  // =======================
  const saveButtons = document.querySelectorAll(".save-job-btn");
  const savedJobsContainer = document.getElementById("saved-jobs-container");
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  savedJobs.forEach(job => {
    const jobDiv = document.createElement("div");
    jobDiv.className = "job-card";
    jobDiv.innerHTML = job;
    savedJobsContainer.appendChild(jobDiv);
  });

  saveButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const jobCard = this.parentElement.outerHTML;
      savedJobs.push(jobCard);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      this.disabled = true;
      this.innerText = "✅ Saved";
    });
  });
});
