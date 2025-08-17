

const jobsContainer = document.querySelector(".jobs-container");
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

if (savedJobs.length === 0) {
    jobsContainer.innerHTML = "<p>No jobs saved yet.</p>";
} else {
    savedJobs.forEach(job => {
        jobsContainer.innerHTML += `
        <div class="jList">
            <a href="${job.link}" target="_blank">
                <img src="${job.img}" alt="">
                <h3>${job.position}</h3>
                <p>${job.salary}</p>
                <div class="type">
                    <p>${job.type}</p>
                </div>
            </a>
        </div>`;
    });
}
