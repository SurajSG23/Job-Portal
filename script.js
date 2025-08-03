function Redirect(){
    window.location.href = "components/homepage.html"
}

let jobCount = 0;
const limit = 5; // Number of jobs per scroll
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


window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadJobs();
  }
});

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

