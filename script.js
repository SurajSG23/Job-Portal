 feat/CHATBOT
 feat/CHATBOT
console.log("Script loaded");

// Back to Top Button
let mybutton = document.getElementById("backToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

mybutton.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ------------------
// Job Card Loader
// ------------------
function Redirect() {
  window.location.href = "components/homepage.html";
}

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

// ------------------
// Chatbot Logic
// ------------------
document.addEventListener("DOMContentLoaded", () => {
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

  toggleBtn.addEventListener("click", () => {
    chatbot.style.display = "flex";
    toggleBtn.setAttribute("aria-expanded", "true");
    inputField.focus();
    if (!greeted) {
      appendMessage("Bot", "Hello! How can I help you today?");
      greeted = true;
    }
  });

  closeBtn.addEventListener("click", () => {
    chatbot.style.display = "none";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  });

  sendBtn.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  chatbot.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      chatbot.style.display = "none";
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  });

  function sendMessage() {
    const userMsg = inputField.value.trim();
    if (!userMsg) return;

    appendMessage("You", userMsg);
    inputField.value = "";

    setTimeout(() => {
      const botReply = getBotReply(userMsg);
      appendMessage("Bot", botReply);
    }, 600);
  }

  function getBotReply(input) {
    input = input.toLowerCase();
    if (input.includes("hello")) return "Hi there! How can I assist you?";
    if (input.includes("job")) return "You can browse job listings below.";
    if (input.includes("apply")) return "Click on a job card to view details and apply.";
    return "I'm here to help with job-related queries!";
  }

  // ------------------
  // Sign-in / Sign-up Toggle
  // ------------------
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
});


function Redirect(){
    window.location.href = "components/homepage.html"
}

document.addEventListener('DOMContentLoaded', function () {
  const saveButtons = document.querySelectorAll('.save-job-btn');
  const savedJobsContainer = document.getElementById('saved-jobs-container');

  // Load saved jobs from localStorage on page load
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'job-card';
    jobDiv.innerHTML = job;
    savedJobsContainer.appendChild(jobDiv);
  });


  saveButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const jobCard = this.parentElement;
      const jobHTML = jobCard.outerHTML;
      savedJobs.push(jobHTML);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));

      const jobDiv = document.createElement('div');
      jobDiv.className = 'job-card';
      jobDiv.innerHTML = jobHTML;
      savedJobsContainer.appendChild(jobDiv);

      this.disabled = true;
      this.innerText = '✅ Saved';
    });
  });
});
main
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

