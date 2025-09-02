const events = [
  {
    title: "Tech Networking Meetup",
    type: "Networking",
    date: "2025-09-10",
    time: "6:00 PM",
    location: "Delhi",
    venue: "Delhi Tech Hub",
    description: "Meet tech professionals, share ideas, and grow your network.",
    registration: "https://example.com/register/networking",
    status: "upcoming"
  },
  {
    title: "Virtual Career Fair",
    type: "Career Fair",
    date: "2025-09-20",
    time: "10:00 AM",
    location: "Remote",
    venue: "Online (Zoom)",
    description: "Connect with top employers and explore job opportunities.",
    registration: "https://example.com/register/careerfair",
    status: "upcoming"
  },
  {
    title: "Resume Building Workshop",
    type: "Workshop",
    date: "2025-08-15",
    time: "2:00 PM",
    location: "Bangalore",
    venue: "Bangalore Career Center",
    description: "Hands-on workshop to craft a winning resume.",
    registration: "https://example.com/register/workshop",
    status: "past",
    recording: "https://example.com/recordings/resume-workshop"
  },
  {
    title: "AI in Careers Webinar",
    type: "Webinar",
    date: "2025-08-01",
    time: "5:00 PM",
    location: "Remote",
    venue: "Online (Teams)",
    description: "Learn how AI is transforming the job market.",
    registration: "https://example.com/register/webinar",
    status: "past",
    recording: "https://example.com/recordings/ai-webinar"
  },
  {
    title: "Annual Hackathon",
    type: "Hackathon",
    date: "2025-10-05",
    time: "9:00 AM",
    location: "Mumbai",
    venue: "Mumbai Innovation Lab",
    description: "Showcase your coding skills and win exciting prizes.",
    registration: "https://example.com/register/hackathon",
    status: "upcoming"
  }
];

function renderEvents() {
  const type = document.getElementById('eventTypeFilter').value;
  const location = document.getElementById('eventLocationFilter').value;
  const status = document.getElementById('eventStatusFilter').value;
  const list = document.getElementById('eventsList');
  list.innerHTML = '';

  let filtered = events.filter(ev =>
    (type === '' || ev.type === type) &&
    (location === '' || ev.location === location) &&
    (status === '' || ev.status === status)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<p style="text-align:center;">No events found for the selected filters.</p>`;
    return;
  }

  filtered.forEach(ev => {
    const isPast = ev.status === "past";
    const card = document.createElement('div');
    card.className = 'event-card' + (isPast ? ' past' : '');
    card.innerHTML = `
      <div class="event-title">${ev.title}</div>
      <div class="event-meta">
        <span><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
        <span><i class="fa-regular fa-clock"></i> ${ev.time}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${ev.venue} (${ev.location})</span>
        <span><i class="fa-solid fa-tag"></i> ${ev.type}</span>
      </div>
      <div class="event-description">${ev.description}</div>
      <div class="event-actions">
        ${isPast && ev.recording ? `<a href="${ev.recording}" class="event-recording-link" target="_blank">View Recording</a>` : ''}
        <a href="${ev.registration}" class="event-register-btn" target="_blank" ${isPast ? 'style="display:none;"' : ''}>Register</a>
      </div>
    `;
    list.appendChild(card);
  });
}

['eventTypeFilter', 'eventLocationFilter', 'eventStatusFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', renderEvents);
});

window.addEventListener('DOMContentLoaded', renderEvents);