function Redirect(){
    window.location.href = "components/homepage.html"
}

// Check if elements exist before using them
const jobList = document.getElementById("job-list");
let jobCount = 0;
const limit = 5; // Number of jobs per scroll

function generateJobCard(index) {
  return `
    <div class="job-card">
      <h3>Job Title ${index + 1}</h3>
      <p>Company ${index + 1}</p>
      <p>Description for job ${index + 1}</p>
    </div>`;
}

function loadJobs() {
  // Only proceed if jobList exists
  if (!jobList) return;
  
  // No need for loader if it doesn't exist
  setTimeout(() => {
    for (let i = 0; i < limit; i++) {
      jobList.innerHTML += generateJobCard(jobCount);
      jobCount++;
    }
  }, 1000); 
}

// Only call loadJobs if jobList exists
if (jobList) {
  loadJobs(); 

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadJobs();
    }
  });
}

// Check if backToTopBtn exists before using it
const mybutton = document.getElementById("backToTopBtn");
if (mybutton) {
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
}

// Notification System - Check if elements exist
const notificationIcon = document.getElementById('notificationIcon');
const notificationBadge = document.getElementById('notificationBadge');
const notificationDropdown = document.getElementById('notificationDropdown');
const notificationList = document.getElementById('notificationList');
const markAllReadBtn = document.getElementById('markAllRead');

// Only proceed if notification elements exist
if (notificationIcon && notificationBadge && notificationDropdown && notificationList) {
  // Sample notifications data (in a real app, this would come from a backend)
  let notifications = [];

  // Function to toggle notification dropdown
  notificationIcon.addEventListener('click', () => {
    notificationDropdown.classList.toggle('notification-show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!notificationIcon.contains(event.target) && notificationDropdown.classList.contains('notification-show')) {
      notificationDropdown.classList.remove('notification-show');
    }
  });

  // Mark all notifications as read (if button exists)
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach(notification => {
        notification.read = true;
      });
      updateNotifications();
    });
  }

  // Function to add a new notification
  function addNotification(title, message) {
    const newNotification = {
      id: Date.now(),
      title: title,
      message: message,
      time: new Date(),
      read: false
    };
    
    notifications.unshift(newNotification); // Add to beginning of array
    updateNotifications();
    
    // Show notification badge
    notificationBadge.textContent = getUnreadCount();
  }

  // Function to update the notification list in the UI
  function updateNotifications() {
    // Update badge count
    const unreadCount = getUnreadCount();
    notificationBadge.textContent = unreadCount;
    
    // If badge count is 0, hide it
    if (unreadCount === 0) {
      notificationBadge.style.display = 'none';
    } else {
      notificationBadge.style.display = 'flex';
    }
    
    // Clear current notifications
    notificationList.innerHTML = '';
    
    // If no notifications, show empty message
    if (notifications.length === 0) {
      notificationList.innerHTML = '<div class="empty-notification">No job notifications available</div>';
      return;
    }
    
    // Add notifications to the list
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
      
      const timeAgo = getTimeAgo(notification.time);
      
      notificationItem.innerHTML = `
        <div class="notification-content">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
          <div class="notification-time">${timeAgo}</div>
        </div>
      `;
      
      // Mark as read when clicked and navigate to appropriate page
      notificationItem.addEventListener('click', () => {
        notification.read = true;
        updateNotifications();
        
        // Check if it's an employer notification by the title
        if (notification.title.startsWith('New Employer Job:')) {
          window.location.href = 'components/employer.html';
        } else {
          window.location.href = 'components/seeker.html';
        }
      });
      
      notificationList.appendChild(notificationItem);
    });
  }

  // Helper function to get unread count
  function getUnreadCount() {
    return notifications.filter(notification => !notification.read).length;
  }

  // Helper function to format time ago
  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
  }

  // Initialize notifications
  updateNotifications();

  // Function to fetch the jlist data
  function fetchJobsList() {
    try {
      // Create a script element to load seeker.js
      const script = document.createElement('script');
      script.onload = function() {
        // Once loaded, check if jlist is available in the global scope
        if (typeof jlist !== 'undefined') {
          const jobsList = jlist.slice(); // Make a copy of jlist
          createJobNotifications(jobsList);
        }
      };
      script.onerror = function() {
        console.log('Failed to load seeker.js');
      };
      script.src = 'components/seeker.js';
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error fetching jobs list:', error);
    }
  }

  // Function to create notifications from recent jobs
  function createJobNotifications(jobsList) {
    if (!jobsList || jobsList.length === 0) {
      updateNotifications();
      return;
    }
    
    // Get the last 3 jobs (most recently added to the array)
    const recentJobs = jobsList.slice(-3).reverse();
    
    // Clear existing notifications
    notifications = [];
    
    // Create a notification for each recent job
    recentJobs.forEach(job => {
      addNotification(
        `New Job: ${job.position}`, 
        `${job.position} position is available with salary ${job.salary} (${job.type})`
      );
    });
  }

  // Initialize notifications when page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchJobsList();
  });

  // Add event listener for refresh button
  const refreshBtn = document.getElementById('refreshNotifications');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchJobsList();
    });
  }
}

// Function to fetch employer jobs from localStorage
function fetchEmployerJobs() {
  try {
    // Get jobs from localStorage (where employer.js stores them)
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length > 0) {
      createEmployerNotifications(jobs);
    }
  } catch (error) {
    console.error('Error fetching employer jobs:', error);
  }
}

// Function to create notifications from employer jobs
function createEmployerNotifications(jobs) {
  if (!jobs || jobs.length === 0) {
    updateNotifications();
    return;
  }
  
  // Sort jobs by timestamp (newest first) and get the last 3
  const recentJobs = jobs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);
  
  // Clear existing notifications
  notifications = [];
  
  // Create a notification for each recent job
  recentJobs.forEach(job => {
    addNotification(
      `New Employer Job: ${job.position}`, 
      `${job.company_name} is hiring for ${job.position} with salary $${job.salary}/m (${job.job_type})`
    );
  });
}

// Add event listener for employer refresh button
const refreshEmployerBtn = document.getElementById('refreshEmployerNotifications');
if (refreshEmployerBtn) {
  refreshEmployerBtn.addEventListener('click', () => {
    fetchEmployerJobs();
  });
}

// Initialize both types of notifications when page loads
document.addEventListener('DOMContentLoaded', () => {
  // First try to load seeker.js notifications
  fetchJobsList();
  
  // Then also load employer notifications
  fetchEmployerJobs();
});

