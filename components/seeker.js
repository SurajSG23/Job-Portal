function updateDropdown(label) {
  document.getElementById('jobDropdown').textContent = label;
}

const jlist = [
    {
        img: "../assets/google-logo.png",
        position: "Web Developer",
        salary: "$900-1200/m",
        type: "Full Time",
        link: "https://www.google.com/about/careers/applications/"
    },
    {
        img: "../assets/netflix-logo.png",
        position: "Designer",
        salary: "$700-1100/m",
        type: "Part Time",
        link: "https://jobs.netflix.com/"
    },
    {
        img: "../assets/github-logo.png",
        position: "Open source contributor",
        salary: "$900-1200/m",
        type: "Freelancer",
        link: "https://www.github.careers/careers-home"
    },
    {
        img: "../assets/amazon-logo.png",
        position: "Customer Service",
        salary: "$600-900/m",
        type: "Full time",
        link: "https://www.amazon.jobs/en/"
    },
    {
        img: "../assets/apple-logo.png",
        position: "Front End Developer",
        salary: "$700-1400/m",
        type: "Part Time",
        link: "https://www.apple.com/careers/in/"
    },
    {
        img: "../assets/meta-logo.png",
        position: "Designer",
        salary: "$500-1200/m",
        type: "Part Time",
        link: "https://www.metacareers.com/jobs"
    },
    {
        img: "../assets/linkedin-logo.png",
        position: "Human Resource",
        salary: "$400-900/m",
        type: "Part Time",
        link: "https://www.linkedin.com/jobs/"
    },
    {
        img: "../assets/samsung-logo.png",
        position: "Back-end Developer",
        salary: "$1100-1700/m",
        type: "Freelancer",
        link: "https://www.samsung.com/in/about-us/careers/?srsltid=AfmBOooetR8lgJbiBWWHc3NO0CRxOUE-8ornVLq-Q2I4ZnpIXxCHqjOK"
    },
    {
        img: "../assets/udemy-logo.png",
        position: "Teacher/Professor",
        salary: "$500-1200/m",
        type: "Full time",
        link: "https://about.udemy.com/careers/"
    },
    {
        img: "../assets/ChatGPT-logo.png",
        position: "AI Engineer",
        salary: "$1200-1600/m",
        type: "Part Time",
        link: "https://openai.com/careers/"
    },
    {
        img: "../assets/insta-logo.png",
        position: "Content Creator",
        salary: "$200-600/m",
        type: "Freelancer",
        link: "https://about.instagram.com/about-us/careers"
    },
];
const jobsContainer = document.getElementsByClassName("jobs-container")[0];
for (const job of jlist) {
    jobsContainer.innerHTML += `
    <a href="${job.link}" class="job-links" target="_blank">
    <div class="jList">
    <img src="${job.img}" alt="">
    <h3>${job.position}</h3>
    <p>${job.salary}</p>
    <div class="type">
    <p>${job.type}</p>
    </div>
    </div>
    </a>`
}

const filter = (value) => {
    let storedJobs = JSON.parse(localStorage.getItem('jobs'));
    jobsContainer.innerHTML = '';
    let filteredJobs
    if (value == "all") {
        filteredJobs = jlist;
    }
    else if (value == "recent") {
        for (const job of storedJobs) {
            jobsContainer.innerHTML += `
            <div class="jList">
            <h3>${job.company_name}</h3>
            <h3>${job.position}</h3>
            <p>$${job.salary}/m</p>
            <div class="type">
            <p>${job.job_type}</p>
            </div>
            </div>`
        }
    }
    else {
        filteredJobs=jlist.filter(job=>job.type.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }
        for (const job of filteredJobs) {
            jobsContainer.innerHTML += `
        <a href="${job.link}" class="job-links" target="_blank">
        <div class="jList">
        <img src="${job.img}" alt="">
        <h3>${job.position}</h3>
        <p>${job.salary}</p>
        <div class="type">
        <p>${job.type}</p>
        </div>
        </div>
        </a>`
        }

};
function searchandfilterInput(){
    const query = document.getElementById('searchInput').value.toLowerCase();
    const salary = document.getElementById('salaryFilter').value.toLowerCase();

    const filteredJobs = jlist.filter(job => {
    const minSalary = parseInt(job.salary.replace(/[^0-9\-]/g, '').split('-')[0]);
    const matchesQuery = job.position.toLowerCase().includes(query);
    const matchesSalary = !salary || minSalary >= parseInt(salary);
    return matchesQuery && matchesSalary;
    });

    jobsContainer.innerHTML = '';
    for (const job of filteredJobs) {
        jobsContainer.innerHTML += `
        <a href="${job.link}" class="job-links" target="_blank">
            <div class="jList">
                <img src="${job.img}" alt="">
                <h3>${job.position}</h3>
                <p>${job.salary}</p>
                <div class="type">
                    <p>${job.type}</p>
                </div>
            </div>
        </a>`;
    }
}
document.getElementById('searchInput').addEventListener('input', searchandfilterInput);
document.getElementById('salaryFilter').addEventListener('change', searchandfilterInput);

document.getElementsByClassName("apply-btn")[0].addEventListener("click", () => {
    document.getElementsByClassName("apply")[0].style.visibility = "visible"
    document.getElementsByClassName("apply")[0].style.width = "60vw"
    document.getElementsByClassName("apply")[0].style.height = "70vh"
})

document.getElementsByClassName("Cancel")[0].addEventListener("click", () => {
    document.getElementsByClassName("apply")[0].style.visibility = "hidden"
    document.getElementsByClassName("apply")[0].style.width = "50vw"
    document.getElementsByClassName("apply")[0].style.height = "60vh"
})

document.getElementsByClassName("Submit")[0].addEventListener("click", () => {
    let seeker_name = document.getElementById("name").value
    let seeker_skills = document.getElementById("skills").value
    let seeker_yoe = document.getElementById("yoe").value
    let seeker_phNo = document.getElementById("phNo").value
    let seeker_email = document.getElementById("email").value
    let seeker_type = document.querySelector('input[name="job-type"]:checked').value

    if (seeker_name && seeker_skills && seeker_yoe && seeker_phNo && seeker_type) {
        let seekerDetails = {
            name: seeker_name,
            skills: seeker_skills,
            yoe: seeker_yoe,
            phone: seeker_phNo,
            email: seeker_email,
            jobType: seeker_type
        };

        localStorage.setItem("seekerDetails", JSON.stringify(seekerDetails));

        document.getElementsByClassName("apply")[0].style.visibility = "hidden"
        document.getElementsByClassName("apply")[0].style.width = "50vw"
        document.getElementsByClassName("apply")[0].style.height = "60vh"
        alert("Submission successfull!")
        document.getElementById("name").value = ''
        document.getElementById("skills").value = ''
        document.getElementById("yoe").value = ''
        document.getElementById("phNo").value = ''
        document.getElementById("email").value = ''
        document.querySelector('input[name="job-type"]:checked').value = ''
    }
})

