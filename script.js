function Redirect(){
    window.location.href = "components/homepage.html"
}
  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechCo",
      posted: "2025-08-01"
    },
    {
      title: "Backend Engineer",
      company: "CodeWorks",
      posted: "2025-08-03"
    },
    {
      title: "UI/UX Designer",
      company: "Designify",
      posted: "2025-07-30"
    }
  ];

  const jobList = document.getElementById("job-list");
  const sortSelect = document.getElementById("sort-select");

  function renderJobs(jobsToRender) {
    jobList.innerHTML = "";
    jobsToRender.forEach(job => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <small>Posted on: ${job.posted}</small>
      `;
      jobList.appendChild(jobCard);
    });
  }

  function sortJobs(method) {
    let sorted = [...jobs];
    if (method === "latest") {
      sorted.sort((a, b) => new Date(b.posted) - new Date(a.posted));
    } else if (method === "alpha") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    renderJobs(sorted);
  }

  renderJobs(jobs);

  sortSelect.addEventListener("change", () => {
    sortJobs(sortSelect.value);
  });

