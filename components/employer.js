// Global variables to store data
let jobsData = [];
let applicationsData = [];
let currentUser = {
    name: "John Doe",
    company: "Tech Solutions Inc.",
    email: "john@techsolutions.com"
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateStats();
    loadJobsFromStorage();
    loadApplicationsFromStorage();
    showEmptyStateIfNeeded();
});

function initializeApp() {
    // Set user info
    document.getElementById('employerName').textContent = currentUser.name;
    document.getElementById('companyName').textContent = currentUser.company;
    document.getElementById('companyNameInput').value = currentUser.company;
    
    // Show dashboard by default
    showSection('dashboard');
}

// Navigation between sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to corresponding nav item
    const activeNavItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update view based on section
    if (sectionId === 'jobs') {
        displayJobs();
        showEmptyStateIfNeeded();
    } else if (sectionId === 'applications') {
        displayApplications();
    }
}

// Show/Hide Add Job Form
function showAddJobForm() {
    const form = document.getElementById('addJobForm');
    const emptyState = document.getElementById('emptyState');
    
    form.style.display = 'block';
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
    
    // Focus on first input
    document.getElementById('jobTitle').focus();
}

function hideAddJobForm() {
    const form = document.getElementById('addJobForm');
    form.style.display = 'none';
    
    // Clear form
    document.getElementById('jobForm').reset();
    
    // Show empty state if no jobs
    showEmptyStateIfNeeded();
}

// Check if empty state should be shown
function showEmptyStateIfNeeded() {
    const emptyState = document.getElementById('emptyState');
    const jobsList = document.querySelector('#jobsList .jobs-list');
    
    if (jobsData.length === 0) {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        if (jobsList) {
            jobsList.style.display = 'none';
        }
    } else {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        if (jobsList) {
            jobsList.style.display = 'block';
        }
    }
}

// Add new job
function addJob(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const jobData = {
        id: Date.now().toString(),
        title: formData.get('jobTitle'),
        location: formData.get('jobLocation'),
        type: formData.get('jobType'),
        salary: formData.get('jobSalary'),
        description: formData.get('jobDescription'),
        requirements: formData.get('jobRequirements'),
        datePosted: new Date().toLocaleDateString(),
        status: 'active',
        applications: 0,
        views: 0
    };
    
    // Validate required fields
    if (!jobData.title || !jobData.location || !jobData.type || !jobData.description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Add to jobs array
    jobsData.push(jobData);
    
    // Save to localStorage
    saveJobsToStorage();
    
    // Update display
    displayJobs();
    updateStats();
    hideAddJobForm();
    
    // Show success message
    showNotification('Job posted successfully!', 'success');
}

// Display jobs list
function displayJobs() {
    const jobsContainer = document.getElementById('jobsList');
    
    if (jobsData.length === 0) {
        showEmptyStateIfNeeded();
        return;
    }
    
    // Remove existing jobs list if it exists
    const existingList = jobsContainer.querySelector('.jobs-list');
    if (existingList) {
        existingList.remove();
    }
    
    // Create jobs list container
    const jobsList = document.createElement('div');
    jobsList.className = 'jobs-list';
    
    jobsData.forEach(job => {
        const jobCard = createJobCard(job);
        jobsList.appendChild(jobCard);
    });
    
    jobsContainer.appendChild(jobsList);
}

// Create individual job card
function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
        <div class="job-header">
            <div>
                <h3 class="job-title">${job.title}</h3>
                <div class="job-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                    <span><i class="fas fa-calendar"></i> ${job.datePosted}</span>
                    ${job.salary ? `<span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>` : ''}
                </div>
            </div>
            <div class="job-actions">
                <button class="btn btn-warning btn-sm" onclick="viewApplications('${job.id}')">
                    <i class="fas fa-users"></i> Requests (${job.applications})
                </button>
                <button class="btn btn-secondary btn-sm" onclick="editJob('${job.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteJob('${job.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
        
        <div class="job-description">
            ${job.description}
        </div>
        
        ${job.requirements ? `
        <div class="job-requirements">
            <strong>Requirements:</strong>
            <p>${job.requirements}</p>
        </div>
        ` : ''}
        
        <div class="job-stats">
            <span><i class="fas fa-eye"></i> ${job.views} views</span>
            <span><i class="fas fa-users"></i> ${job.applications} applications</span>
            <span class="status-${job.status}"><i class="fas fa-circle"></i> ${job.status}</span>
        </div>
    `;
    
    return jobCard;
}

// Delete individual job
function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
        // Remove from jobs array
        jobsData = jobsData.filter(job => job.id !== jobId);
        
        // Remove related applications
        applicationsData = applicationsData.filter(app => app.jobId !== jobId);
        
        // Save to localStorage
        saveJobsToStorage();
        saveApplicationsToStorage();
        
        // Update display
        displayJobs();
        updateStats();
        showEmptyStateIfNeeded();
        
        // Show success message
        showNotification('Job deleted successfully!', 'success');
    }
}

// Edit job (placeholder - you can expand this)
function editJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    // Fill form with existing data
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('jobLocation').value = job.location;
    document.getElementById('jobType').value = job.type;
    document.getElementById('jobSalary').value = job.salary || '';
    document.getElementById('jobDescription').value = job.description;
    document.getElementById('jobRequirements').value = job.requirements || '';
    
    // Show form
    showAddJobForm();
    
    // Update form submit to edit instead of add
    const form = document.getElementById('jobForm');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateJob(jobId, event);
    };
    
    // Change button text
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Job';
}

// Update existing job
function updateJob(jobId, event) {
    const formData = new FormData(event.target);
    const jobIndex = jobsData.findIndex(job => job.id === jobId);
    
    if (jobIndex === -1) return;
    
    // Update job data
    jobsData[jobIndex] = {
        ...jobsData[jobIndex],
        title: formData.get('jobTitle'),
        location: formData.get('jobLocation'),
        type: formData.get('jobType'),
        salary: formData.get('jobSalary'),
        description: formData.get('jobDescription'),
        requirements: formData.get('jobRequirements')
    };
    
    // Save and update display
    saveJobsToStorage();
    displayJobs();
    hideAddJobForm();
    
    // Reset form submit handler
    document.getElementById('jobForm').onsubmit = addJob;
    document.querySelector('#jobForm button[type="submit"]').textContent = 'Post Job';
    
    showNotification('Job updated successfully!', 'success');
}

// View applications for a specific job (Requests button functionality)
function viewApplications(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    // Switch to applications section
    showSection('applications');
    
    // Filter applications for this job
    const jobApplications = applicationsData.filter(app => app.jobId === jobId);
    
    if (jobApplications.length === 0) {
        showNotification(`No applications found for "${job.title}"`, 'info');
        return;
    }
    
    // Display filtered applications
    displayFilteredApplications(jobApplications, `Applications for "${job.title}"`);
}

// Display applications
function displayApplications(filteredApps = null, title = null) {
    const applicationsContainer = document.getElementById('applicationsList');
    const apps = filteredApps || applicationsData;
    
    if (apps.length === 0) {
        applicationsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h3>${title ? `No ${title.toLowerCase()}` : 'No Applications Yet'}</h3>
                <p>Applications will appear here once candidates start applying to your jobs.</p>
            </div>
        `;
        return;
    }
    
    applicationsContainer.innerHTML = '';
    
    if (title) {
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.marginBottom = '1rem';
        applicationsContainer.appendChild(titleElement);
    }
    
    apps.forEach(application => {
        const applicationCard = createApplicationCard(application);
        applicationsContainer.appendChild(applicationCard);
    });
}

// Display filtered applications with title
function displayFilteredApplications(applications, title) {
    displayApplications(applications, title);
}

// Create application card
function createApplicationCard(application) {
    const job = jobsData.find(j => j.id === application.jobId);
    const jobTitle = job ? job.title : 'Unknown Job';
    
    const applicationCard = document.createElement('div');
    applicationCard.className = 'application-card';
    applicationCard.innerHTML = `
        <div class="application-header">
            <div>
                <div class="applicant-name">${application.name}</div>
                <div style="color: #666; font-size: 0.9rem;">${jobTitle}</div>
            </div>
            <span class="application-status status-${application.status}">
                ${application.status}
            </span>
        </div>
        
        <div class="application-details">
            <div>
                <span><i class="fas fa-envelope"></i> ${application.email}</span>
                <span><i class="fas fa-calendar"></i> Applied: ${application.dateApplied}</span>
            </div>
            <div class="application-actions">
                <button class="btn btn-primary btn-sm" onclick="viewApplicationDetails('${application.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                ${application.status === 'pending' ? `
                    <button class="btn btn-success btn-sm" onclick="updateApplicationStatus('${application.id}', 'shortlisted')">
                        <i class="fas fa-check"></i> Shortlist
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="updateApplicationStatus('${application.id}', 'rejected')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return applicationCard;
}

// View application details in modal
function viewApplicationDetails(applicationId) {
    const application = applicationsData.find(app => app.id === applicationId);
    if (!application) return;
    
    const job = jobsData.find(j => j.id === application.jobId);
    const jobTitle = job ? job.title : 'Unknown Job';
    
    const modalBody = document.getElementById('applicationDetails');
    modalBody.innerHTML = `
        <div class="application-detail-section">
            <h4>Applicant Information</h4>
            <p><strong>Name:</strong> ${application.name}</p>
            <p><strong>Email:</strong> ${application.email}</p>
            <p><strong>Phone:</strong> ${application.phone || 'Not provided'}</p>
            <p><strong>Applied for:</strong> ${jobTitle}</p>
            <p><strong>Date Applied:</strong> ${application.dateApplied}</p>
            <p><strong>Status:</strong> <span class="application-status status-${application.status}">${application.status}</span></p>
        </div>
        
        <div class="application-detail-section">
            <h4>Cover Letter</h4>
            <p>${application.coverLetter || 'No cover letter provided'}</p>
        </div>
        
        <div class="application-detail-section">
            <h4>Resume</h4>
            <p>${application.resume ? `<a href="${application.resume}" target="_blank">View Resume</a>` : 'No resume uploaded'}</p>
        </div>
    `;
    
    document.getElementById('applicationModal').style.display = 'block';
}

// Close application modal
function closeApplicationModal() {
    document.getElementById('applicationModal').style.display = 'none';
}

// Update application status
function updateApplicationStatus(applicationId, newStatus) {
    const applicationIndex = applicationsData.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) return;
    
    applicationsData[applicationIndex].status = newStatus;
    
    // Save to localStorage
    saveApplicationsToStorage();
    
    // Update display
    displayApplications();
    closeApplicationModal();
    
    // Show notification
    const statusMessages = {
        'shortlisted': 'Application shortlisted successfully!',
        'rejected': 'Application rejected.',
        'reviewing': 'Application moved to under review.'
    };
    
    showNotification(statusMessages[newStatus] || 'Application status updated!', 'success');
}

// Filter applications by status
function filterApplications() {
    const filter = document.getElementById('statusFilter').value;
    
    if (filter === 'all') {
        displayApplications();
    } else {
        const filtered = applicationsData.filter(app => app.status === filter);
        displayApplications(filtered, `${filter} applications`);
    }
}

// Update statistics
function updateStats() {
    const totalJobs = jobsData.length;
    const activeJobs = jobsData.filter(job => job.status === 'active').length;
    const totalApplications = applicationsData.length;
    
    document.getElementById('totalJobs').textContent = totalJobs;
    document.getElementById('activeJobs').textContent = activeJobs;
    document.getElementById('totalApplications').textContent = totalApplications;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#cce5ff'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0066cc'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#b3d9ff'};
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Local Storage functions
function saveJobsToStorage() {
    localStorage.setItem('employerJobs', JSON.stringify(jobsData));
}

function loadJobsFromStorage() {
    const saved = localStorage.getItem('employerJobs');
    if (saved) {
        jobsData = JSON.parse(saved);
    } else {
        // Add some sample data for demonstration
        jobsData = [
            {
                id: '1',
                title: 'Senior Frontend Developer',
                location: 'New York, NY',
                type: 'full-time',
                salary: '$80,000 - $100,000',
                description: 'We are looking for an experienced Frontend Developer to join our team.',
                requirements: 'React, JavaScript, HTML, CSS, 3+ years experience',
                datePosted: new Date().toLocaleDateString(),
                status: 'active',
                applications: 5,
                views: 24
            }
        ];
        saveJobsToStorage();
    }
}

function saveApplicationsToStorage() {
    localStorage.setItem('employerApplications', JSON.stringify(applicationsData));
}

function loadApplicationsFromStorage() {
    const saved = localStorage.getItem('employerApplications');
    if (saved) {
        applicationsData = JSON.parse(saved);
    } else {
        // Add some sample applications
        applicationsData = [
            {
                id: '1',
                jobId: '1',
                name: 'Jane Smith',
                email: 'jane.smith@email.com',
                phone: '(555) 123-4567',
                dateApplied: new Date().toLocaleDateString(),
                status: 'pending',
                coverLetter: 'I am very interested in this position and believe my skills align well with your requirements.',
                resume: null
            }
        ];
        saveApplicationsToStorage();
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any sensitive data if needed
        window.location.href = '../index.html';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeApplicationModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape key to close modals
    if (event.key === 'Escape') {
        closeApplicationModal();
        hideAddJobForm();
    }
    
    // Ctrl+N to add new job
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        showAddJobForm();
    }
});

// Additional utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatJobType(type) {
    return type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}