document.getElementById('jobApplicationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;

  
  document.getElementById('responseMessage').innerText = `Thank you, ${name}! Your application has been submitted.`;
  

  this.reset();
});
