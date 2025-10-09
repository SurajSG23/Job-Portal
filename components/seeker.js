function updateDropdown(label) {
  document.getElementById('jobDropdown').textContent = label;
}

const jlist = [
    {
        img: "../assets/google-logo.webp",
        position: "Web Developer",
        salary: "$900-1200/m",
        type: "Full Time",
        link: "https://www.google.com/about/careers/applications/"
    },
    {
        img: "../assets/netflix-logo.webp",
        position: "Designer",
        salary: "$700-1100/m",
        type: "Part Time",
        link: "https://jobs.netflix.com/"
    },
    {
        img: "../assets/github-logo.webp",
        position: "Open source contributor",
        salary: "$900-1200/m",
        type: "Freelancer",
        link: "https://www.github.careers/careers-home"
    },
    {
        img: "../assets/amazon-logo.webp",
        position: "Customer Service",
        salary: "$600-900/m",
        type: "Full time",
        link: "https://www.amazon.jobs/en/"
    },
    {
        img: "../assets/apple-logo.webp",
        position: "Front End Developer",
        salary: "$700-1400/m",
        type: "Part Time",
        link: "https://www.apple.com/careers/in/"
    },
    {
        img: "../assets/meta-logo.webp",
        position: "Designer",
        salary: "$500-1200/m",
        type: "Part Time",
        link: "https://www.metacareers.com/jobs"
    },
    {
        img: "../assets/linkedin-logo.webp",
        position: "Human Resource",
        salary: "$400-900/m",
        type: "Part Time",
        link: "https://www.linkedin.com/jobs/"
    },
    {
        img: "../assets/samsung-logo.webp",
        position: "Back-end Developer",
        salary: "$1100-1700/m",
        type: "Freelancer",
        link: "https://www.samsung.com/in/about-us/careers/?srsltid=AfmBOooetR8lgJbiBWWHc3NO0CRxOUE-8ornVLq-Q2I4ZnpIXxCHqjOK"
    },
    {
        img: "../assets/udemy-logo.webp",
        position: "Teacher/Professor",
        salary: "$500-1200/m",
        type: "Full time",
        link: "https://about.udemy.com/careers/"
    },
    {
        img: "../assets/ChatGPT-logo.webp",
        position: "AI Engineer",
        salary: "$1200-1600/m",
        type: "Part Time",
        link: "https://openai.com/careers/"
    },
    {
        img: "../assets/insta-logo.webp",
        position: "Content Creator",
        salary: "$200-600/m",
        type: "Freelancer",
        link: "https://about.instagram.com/about-us/careers"
    },
];
const jobsContainer = document.getElementsByClassName("jobs-container")[0];
for (const job of jlist) {
    jobsContainer.innerHTML += `
    <div class="jList">
        <a href="${job.link}" class="job-links" target="_blank">
            <img src="${job.img}" alt="" style="width: 200px; height: 200px;">
            <h3>${job.position}</h3>
            <p>${job.salary}</p>
            <div class="type">
                <p>${job.type}</p>
            </div>
        </a>
        <button class="save-job-btn" data-job='${JSON.stringify(job)}' style="
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            margin-top: 10px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
        ">Save Job</button>
    </div>`;
}
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("save-job-btn")) {
        const jobData = JSON.parse(e.target.getAttribute("data-job"));
        let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

       
        if (!savedJobs.some(j => j.link === jobData.link)) {
            savedJobs.push(jobData);
            localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
            alert("Job saved!");
        } else {
            alert("Job already saved!");
        }
    }
});


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

// Close modal when clicking the X button
document.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.getElementsByClassName("apply")[0].style.visibility = "hidden"
    document.getElementsByClassName("apply")[0].style.width = "50vw"
    document.getElementsByClassName("apply")[0].style.height = "60vh"
})


// Back to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.title = "Go to top";
  backToTopBtn.textContent = "↑";
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Enhanced Search Functionality - Add to seeker.js
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const resetFiltersBtn = document.getElementById('resetFilters');
  
  // Sample suggestions data
  const suggestions = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'UI/UX Designer', 'Data Scientist', 'Product Manager',
    'Software Engineer', 'DevOps Engineer', 'Mobile Developer'
  ];
  
  // Show/hide clear button
  searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
      clearSearchBtn.classList.add('visible');
      showSuggestions(this.value);
    } else {
      clearSearchBtn.classList.remove('visible');
      hideSuggestions();
    }
  });
  
  // Clear search
  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    clearSearchBtn.classList.remove('visible');
    hideSuggestions();
    // Trigger search with empty value
    performSearch('');
  });
  
  // Show suggestions
  function showSuggestions(query) {
    const filtered = suggestions.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0 && query.length > 0) {
      searchSuggestions.innerHTML = filtered.map(item => 
        `<div class="suggestion-item">${item}</div>`
      ).join('');
      searchSuggestions.classList.add('show');
      
      // Add click handlers to suggestions
      document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
          searchInput.value = this.textContent;
          hideSuggestions();
          performSearch(this.textContent);
        });
      });
    } else {
      hideSuggestions();
    }
  }
  
  // Hide suggestions
  function hideSuggestions() {
    searchSuggestions.classList.remove('show');
  }
  
  // Reset all filters
  resetFiltersBtn.addEventListener('click', function() {
    searchInput.value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('salaryFilter').value = '';
    document.getElementById('jobTypeFilter').value = '';
    clearSearchBtn.classList.remove('visible');
    hideSuggestions();
    performSearch('');
  });
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box-wrapper')) {
      hideSuggestions();
    }
  });
  
  // Perform search function (integrate with your existing search logic)
  function performSearch(query) {
    // Add your search logic here
    console.log('Searching for:', query);
  }
});

// Interactive Job Cards JavaScript
// Add this to your seeker.js or script.js

class InteractiveJobCards {
  constructor() {
    this.init();
  }

  init() {
    this.setupJobCards();
    this.setupEventListeners();
  }

  setupJobCards() {
    // Sample job data - replace with your actual data
    this.jobsData = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        salary: "$80K - $120K",
        type: "Full-time",
        tags: ["React", "TypeScript", "Remote"],
        description: "Join our innovative team to build cutting-edge web applications using modern technologies. Work with a collaborative team on exciting projects.",
        requirements: [
          "3+ years React experience",
          "TypeScript proficiency",
          "Modern CSS/SCSS skills",
          "REST API integration",
          "Git version control"
        ],
        posted: "2 days ago"
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Minds",
        location: "New York",
        salary: "$60K - $90K",
        type: "Full-time",
        tags: ["Figma", "Design Systems", "Prototyping"],
        description: "Create intuitive and beautiful user experiences for our digital products. Collaborate with development teams to bring designs to life.",
        requirements: [
          "3+ years UI/UX experience",
          "Figma/Sketch proficiency",
          "Design system experience",
          "User research skills",
          "Portfolio required"
        ],
        posted: "1 week ago"
      }
      // Add more job data as needed
    ];

    this.renderJobCards();
  }

  renderJobCards() {
    const jobsContainer = document.querySelector('.jobs-container');
    if (!jobsContainer) return;

    jobsContainer.innerHTML = this.jobsData.map(job => this.createJobCardHTML(job)).join('');
  }

  createJobCardHTML(job) {
    return `
      <div class="job-card" data-job-id="${job.id}">
        <div class="job-card-inner">
          <div class="job-card-front">
            <div class="job-card-header">
              <h3>${job.title}</h3>
              <div class="company-name">
                <div class="company-logo"></div>
                ${job.company}
              </div>
              <div class="job-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
              </div>
              <div class="job-tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
              </div>
              <small style="color: #64748b; margin-top: auto;">${job.posted}</small>
            </div>
            <div class="flip-indicator" title="View details">
              <i class="fas fa-info"></i>
            </div>
          </div>
          <div class="job-card-back">
            <div class="back-indicator" title="Back to overview">
              <i class="fas fa-arrow-left"></i>
            </div>
            <h4>${job.title}</h4>
            <div class="job-description">
              ${job.description}
            </div>
            <div class="job-requirements">
              <h5>Requirements:</h5>
              <ul class="requirements-list">
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
              </ul>
            </div>
            <div class="job-actions">
              <button class="apply-btn" onclick="applyToJob(${job.id})">
                <i class="fas fa-paper-plane"></i> Apply Now
              </button>
              <button class="save-btn" onclick="saveJob(${job.id})">
                <i class="fas fa-heart"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      const jobCard = e.target.closest('.job-card');
      if (!jobCard) return;

      // Handle flip indicator click
      if (e.target.closest('.flip-indicator') || e.target.closest('.back-indicator')) {
        this.toggleCard(jobCard);
        return;
      }

      // Handle card click (but not on buttons)
      if (!e.target.closest('button') && !e.target.closest('a')) {
        this.toggleCard(jobCard);
      }
    });

    // Close card when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.job-card')) {
        this.closeAllCards();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllCards();
      }
    });
  }

  toggleCard(card) {
    const isFlipped = card.classList.contains('flipped');
    
    // Close other cards first
    this.closeAllCards();
    
    if (!isFlipped) {
      card.classList.add('flipped');
      // Add loading effect
      card.classList.add('loading');
      setTimeout(() => {
        card.classList.remove('loading');
      }, 300);
    }
  }

  closeAllCards() {
    document.querySelectorAll('.job-card.flipped').forEach(card => {
      card.classList.remove('flipped');
    });
  }
}

// Job action functions
function applyToJob(jobId) {
  // Add loading state
  const button = event.target;
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
  button.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    alert(`Applied to job ${jobId}!`);
    button.innerHTML = '<i class="fas fa-check"></i> Applied';
    button.style.background = '#10b981';
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = '';
    }, 2000);
  }, 1000);
}

function saveJob(jobId) {
  const button = event.target;
  const originalText = button.innerHTML;
  
  if (button.classList.contains('saved')) {
    button.innerHTML = '<i class="fas fa-heart-broken"></i> Removed';
    button.classList.remove('saved');
  } else {
    button.innerHTML = '<i class="fas fa-heart"></i> Saved';
    button.classList.add('saved');
    button.style.background = '#ef4444';
  }
  
  // Reset after 1 second
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = '';
  }, 1000);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveJobCards();
});

// Alternative: Expandable cards (simpler implementation)
function initExpandableCards() {
  document.querySelectorAll('.job-card.expandable').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
}
