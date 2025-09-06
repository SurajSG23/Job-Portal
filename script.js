
function Redirect(){
    window.location.href = "components/homepage.html"
}

document.addEventListener('DOMContentLoaded', function () {
  const saveButtons = document.querySelectorAll('.save-job-btn');
  const savedJobsContainer = document.getElementById('saved-jobs-container');
  
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

