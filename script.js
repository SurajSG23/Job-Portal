function Redirect(){
    window.location.href = "components/homepage.html"
}

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

function loadApplications() {
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
