function Redirect(){
    window.location.href = "components/homepage.html"
}

document.addEventListener("DOMContentLoaded", function () {
  let jobSection = document.getElementById("job-listings");

  
  let jobs = [
    {
      title: "Frontend Developer",
      description: "Build user interfaces with React and modern tools."
    },
    {
      title: "Backend Developer",
      description: "Work on server-side logic using Node.js and Express."
    },
    {
      title: "UI/UX Designer",
      description: "Design user-friendly layouts and flows."
    }
  ];

  function showJobs() {
    jobSection.innerHTML = ""; 

    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];

   
      let jobCard = document.createElement("div");
      jobCard.className = "job-card";

      let jobTitle = document.createElement("h3");
      jobTitle.innerText = job.title;

      let jobDesc = document.createElement("p");
      jobDesc.innerText = job.description;

      jobCard.appendChild(jobTitle);
      jobCard.appendChild(jobDesc);

      jobSection.appendChild(jobCard);
    }
  }
  setTimeout(showJobs, 2000);
});
