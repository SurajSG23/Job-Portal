function Redirect(){
    window.location.href = "components/homepage.html"
}

// Elements
const jobAlertForm = document.getElementById('jobAlertForm');
const alertKeywordInput = document.getElementById('alertKeyword');
const simulateJobBtn = document.getElementById('simulateJobBtn');
const modal = document.getElementById('jobAlertModal');
const closeBtn = document.querySelector('.close-btn');
const alertMessage = document.getElementById('alertMessage');


jobAlertForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const keyword = alertKeywordInput.value.trim();
  if (keyword) {
    localStorage.setItem('jobAlertKeyword', keyword);
    alert(`Subscribed for alerts with keyword: ${keyword}`);
    alertKeywordInput.value = '';
  }
});

simulateJobBtn.addEventListener('click', function () {
  const savedKeyword = localStorage.getItem('jobAlertKeyword');
  if (savedKeyword) {
    alertMessage.textContent = `New job matching "${savedKeyword}" is available!`;
    modal.style.display = 'block';
  } else {
    alert('No alert preferences found. Please subscribe first.');
  }
});


closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
