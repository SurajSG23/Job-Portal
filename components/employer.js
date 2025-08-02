const submitform = () => {
    let company_name = document.getElementById("company").value.trim();
    let position = document.getElementById("position").value.trim();
    let salary = document.getElementById("salary").value.trim();
    let job_type = document.querySelector('input[name="job-type"]:checked');

    let isValid = true;

    // Clear all errors
    document.getElementById("companyError").textContent = "";
    document.getElementById("positionError").textContent = "";
    document.getElementById("salaryError").textContent = "";
    document.getElementById("jobTypeError").textContent = "";

    // Company Validation
    if (company_name.length < 4) {
        document.getElementById("companyError").textContent = "Company name must be at least 4 characters.";
        isValid = false;
    }

    // Position Validation
    if (position.length < 3) {
        document.getElementById("positionError").textContent = "Position must be at least 3 characters.";
        isValid = false;   
    }

    // Salary Validation
    if (!salary || isNaN(salary) || Number(salary) <= 0) {
        document.getElementById("salaryError").textContent = "Enter a valid positive number for salary.";
        isValid = false;
    }

    // Job Type Validation
    if (!job_type) {
        document.getElementById("jobTypeError").textContent = "Please select a job type.";
        isValid = false;
    }

    // Final Check 
    if (isValid) {
        let job = {
            company_name,
            position,
            salary,
            job_type: job_type.value,
            timestamp: new Date().getTime()
        };

        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs.push(job);
        localStorage.setItem('jobs', JSON.stringify(jobs));

        displayJobs(); 

        // Clear form inputs
        document.getElementById("company").value = "";
        document.getElementById("position").value = "";
        document.getElementById("salary").value = "";
        document.querySelectorAll('input[name="job-type"]').forEach(r => r.checked = false);
    }
}

const clearJobs = () => {
    localStorage.removeItem('jobs');
    document.getElementsByClassName("submittedform")[0].innerHTML = '';
    document.getElementById("company").value = "";
    document.getElementById("position").value = "";
    document.getElementById("salary").value = "";
    document.querySelectorAll('input[name="job-type"]').forEach(r => r.checked = false);
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

const clearReqs = () => {
    localStorage.removeItem('seekerDetails');
    document.getElementsByClassName("requests-container")[0].innerHTML = `<div class="reqs">
        <h3>No Requests</h3>
    </div>`;
    setTimeout(() => {
        document.getElementsByClassName("requests-container")[0].style.visibility = "hidden";
    }, 1000);
}

const displayJobs = () => {
    let submitted_form = document.getElementsByClassName("submittedform")[0];
    submitted_form.innerHTML = '';

    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    jobs.forEach(job => {
        submitted_form.innerHTML += `<div class="forminfo">
            <div><h3>${job.company_name}</h3></div>
            <div><h4>${job.position}</h4></div>
            <div><p>$${job.salary}/m</p></div>
            <div><h6>${job.job_type}</h6></div>
        </div>`;
    });
}

window.onload = displayJobs;

let details = JSON.parse(localStorage.getItem('seekerDetails')) || [];

if (Object.keys(details).length === 0) {
    document.getElementsByClassName("requests-container")[0].innerHTML += `<div class="reqs">
        <h3>No Requests</h3>
    </div>`;
} else {
    document.getElementsByClassName("requests-container")[0].innerHTML += `<div class="reqs">
        <div class="personal">
            <h3>Name: <br>${details.name}</h3>
            <h3>Ph no.: <br>${details.phone}</h3>
            <h3>Email: <br> ${details.email}</h3>
        </div>
        <div><h4>Skills: <br>${details.skills}</h4></div>
        <div><p>Years of experience: <br>${details.yoe}</p></div>
        <div><p>Preferred Job type: <br>${details.jobType}</p></div>
    </div>`;
}

document.getElementsByClassName("req")[0].addEventListener("click", () => {
    const container = document.getElementsByClassName("requests-container")[0];
    container.style.visibility = "visible";
    container.style.width = "60vw";
    container.style.height = "70vh";
});

document.getElementsByClassName("closy")[0].addEventListener("click", () => {
    document.getElementsByClassName("requests-container")[0].style.visibility = "hidden";
});






// OLD CODE

// const submitform = () => {
//     let company_name = document.getElementById("company").value.trim();
//     let position = document.getElementById("position").value.trim();
//     let salary = document.getElementById("salary").value;
//     let job_type = document.querySelector('input[name="job-type"]:checked');

//     let isValid = true;

//     // Clear all errors
//     document.getElementById("companyError").textContent = "";
//     document.getElementById("positionError").textContent = "";
//     document.getElementById("salaryError").textContent = "";
//     document.getElementById("jobTypeError").textContent = "";

//     // Comapny Validation
//     if (company_name.length < 4) {
//         document.getElementById("companyError").textContent = "Company name must be at least 4 characters.";
//         isValid = false;
//     }

//     //Position Validation
//     if (position.length < 3) {
//      document.getElementById("positionError").textContent = "Position must be at least 3 characters.";
//         isValid = false;   
//     }

//     //Salary Validation
//     if (!salary || isNaN(salary) || Number(salary) <= 0) {
//         document.getElementById("salaryError").textContent = "Enter a valid positive number for salary.";
//         isValid = false;
//     }

//     //Job Type Validation
//     if (! job_type) {
//         document.getElementById("jobTypeError").textContent = "Please select a job type";
//         isValid = false;
//     }

//     // Final Check 
//     if (isValid) {
//         let job = {
//             company_name,
//             position,
//             salary,
//             job_type: job_type.value,
//             timestamp: new Date().getTime()
//         };

//         let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
//         jobs.push(job);
//         localStorage.setItem('jobs' , JSON.stringify(jobs));

    
//     }
// }
    
// function clearJobs() {
//     document.getElementById("company").value = "";
//   document.getElementById("position").value = "";
//   document.getElementById("salary").value = "";
//   document.querySelectorAll('input[name="job-type"]').forEach(r => r.checked = false);

//   // Clear error messages
//   document.querySelectorAll(".error").forEach(e => e.textContent = "");

// }


//     if (company_name && position && salary && job_type) {
//         let job = {
//             company_name,
//             position,
//             salary,
//             job_type,
//             timestamp: new Date().getTime()
//         };
//         let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
//         jobs.push(job);
//         localStorage.setItem('jobs', JSON.stringify(jobs));

//         displayJobs();
//         document.getElementById("company").value = '';
//         document.getElementById("position").value = '';
//         document.getElementById("salary").value = '';
//         document.querySelector('input[name="job-type"]:checked').checked = false;
//     } else {
//         alert("Please provide all specifications!");
//     }
// }
// const clearJobs = () => {
//     localStorage.removeItem('jobs');
//     document.getElementsByClassName("submittedform")[0].innerHTML = ''
// }
// const clearReqs = () => {
//     localStorage.removeItem('seekerDetails');
//     document.getElementsByClassName("requests-container")[0].innerHTML = `<div class="reqs">
//     <h3>No Requests</h3>
//     </div>`;
//     setTimeout(() => {
//         document.getElementsByClassName("requests-container")[0].style.visibility="hidden"
//     }, 1000);
    
// }

// const displayJobs = () => {
//     let submitted_form = document.getElementsByClassName("submittedform")[0];
//     submitted_form.innerHTML = '';

//     let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

//     jobs.forEach(job => {
//         submitted_form.innerHTML += `<div class="forminfo">
//             <div><h3>${job.company_name}</h3></div>
//             <div><h4>${job.position}</h4></div>
//             <div><p>$${job.salary}/m</p></div>
//             <div><h6>${job.job_type}</h6></div>
//         </div>`;
//     });
// }

// window.onload = displayJobs;




// let details = JSON.parse(localStorage.getItem('seekerDetails')) || [];

// if (Object.keys(details).length === 0) {
//     document.getElementsByClassName("requests-container")[0].innerHTML += `<div class="reqs">
//     <h3>No Requests</h3>
//     </div>`;
// }
// else {
//     document.getElementsByClassName("requests-container")[0].innerHTML += `<div class="reqs">
//     <div class="personal">
//     <h3>Name: <br>${details.name}</h3>
//     <h3>Ph no.: <br>${details.phone}</h3>
//     <h3>Email: <br> ${details.email}</h3>
//     </div>
//     <div><h4>Skills: <br>${details.skills}</h4></div>
//     <div><p>years of experience: <br>${details.yoe}</p></div>
//     <div><p>Preferred Job type: <br>${details.jobType}</p></div>
//     </div>`
// }

// document.getElementsByClassName("req")[0].addEventListener("click",()=>{
//     document.getElementsByClassName("requests-container")[0].style.visibility="visible"
//     document.getElementsByClassName("requests-container")[0].style.width="60vw"
//     document.getElementsByClassName("requests-container")[0].style.height="70vh"
// })

// document.getElementsByClassName("closy")[0].addEventListener("click",()=>{
//     document.getElementsByClassName("requests-container")[0].style.visibility="hidden"
// })