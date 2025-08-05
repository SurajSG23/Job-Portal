function Redirect(){
  window.location.href = "components/homepage.html";
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
    if (!jobSection) return;

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


const jobList = document.getElementById("job-list");
let jobCount = 0;
const limit = 5;

function generateJobCard(index) {
  return `
    <div class="job-card">
      <h3>Job Title ${index + 1}</h3>
      <p>Company ${index + 1}</p>
      <p>Description for job ${index + 1}</p>
    </div>`;
}

function loadJobs() {
  if (!jobList) return;
  setTimeout(() => {
    for (let i = 0; i < limit; i++) {
      jobList.innerHTML += generateJobCard(jobCount);
      jobCount++;
    }
  }, 1000);
}

if (jobList) {
  loadJobs();

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadJobs();
    }
  });
}



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


const notificationIcon = document.getElementById('notificationIcon');
const notificationBadge = document.getElementById('notificationBadge');
const notificationDropdown = document.getElementById('notificationDropdown');
const notificationList = document.getElementById('notificationList');
const markAllReadBtn = document.getElementById('markAllRead');

if (notificationIcon && notificationBadge && notificationDropdown && notificationList) {
  let notifications = [];

  notificationIcon.addEventListener('click', () => {
    notificationDropdown.classList.toggle('notification-show');
  });

  document.addEventListener('click', (event) => {
    if (!notificationIcon.contains(event.target) && notificationDropdown.classList.contains('notification-show')) {
      notificationDropdown.classList.remove('notification-show');
    }
  });

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach(notification => notification.read = true);
      updateNotifications();
    });
  }

  function addNotification(title, message) {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      time: new Date(),
      read: false
    };

    notifications.unshift(newNotification);
    updateNotifications();
    notificationBadge.textContent = getUnreadCount();
  }

  function updateNotifications() {
    const unreadCount = getUnreadCount();
    notificationBadge.textContent = unreadCount;

    notificationBadge.style.display = unreadCount === 0 ? 'none' : 'flex';

    notificationList.innerHTML = '';

    if (notifications.length === 0) {
      notificationList.innerHTML = '<div class="empty-notification">No job notifications available</div>';
      return;
    }

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

      notificationItem.addEventListener('click', () => {
        notification.read = true;
        updateNotifications();

        if (notification.title.startsWith('New Employer Job:')) {
          window.location.href = 'components/employer.html';
        } else {
          window.location.href = 'components/seeker.html';
        }
      });

      notificationList.appendChild(notificationItem);
    });
  }

  function getUnreadCount() {
    return notifications.filter(notification => !notification.read).length;
  }

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

  function fetchJobsList() {
    try {
      const script = document.createElement('script');
      script.onload = function() {
        if (typeof jlist !== 'undefined') {
          const jobsList = jlist.slice();
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

 
  function createJobNotifications(jobsList) {
    if (!jobsList || jobsList.length === 0) {
      updateNotifications();
      return;
    }

    const recentJobs = jobsList.slice(-3).reverse();

    notifications = [];

    recentJobs.forEach(job => {
      addNotification(
        `New Job: ${job.position}`,
        `${job.position} position is available with salary ${job.salary} (${job.type})`
      );
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetchJobsList();
  });

  const refreshBtn = document.getElementById('refreshNotifications');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchJobsList);
  }
}


function fetchEmployerJobs() {
  try {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    if (jobs.length > 0) {
      createEmployerNotifications(jobs);
    }
  } catch (error) {
    console.error('Error fetching employer jobs:', error);
  }
}

function createEmployerNotifications(jobs) {
  if (!jobs || jobs.length === 0) {
    updateNotifications();
    return;
  }

  const recentJobs = jobs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);

  notifications = [];

  recentJobs.forEach(job => {
    addNotification(
      `New Employer Job: ${job.position}`,
      `${job.company_name} is hiring for ${job.position} with salary $${job.salary}/m (${job.job_type})`
    );
  });
}

const refreshEmployerBtn = document.getElementById('refreshEmployerNotifications');
if (refreshEmployerBtn) {
  refreshEmployerBtn.addEventListener('click', fetchEmployerJobs);
}


document.addEventListener('DOMContentLoaded', () => {
  fetchJobsList();
  fetchEmployerJobs();
});
