// To check the password
function togglePassword(toggleElement) {
    const input = toggleElement.previousElementSibling;
  
    if (input.type === "password") {
      input.type = "text";
      toggleElement.textContent = "👁️";
    } else {
      input.type = "password";
      toggleElement.textContent = "👁️";
    }
  }
// To check wheather is there any issue in password
const resetbutton=document.getElementById("resetpass-button")
resetbutton.addEventListener("click",function (e){
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if(newPassword.length<6){
    alert("Password should be at least of 6 characters");
    return;
  }
  if(newPassword!=confirmPassword){
    alert("Password does not match");
    return;
  }
  
  alert("Password has been reset successfully!");
  window.location.href="login.html";
});

document.getElementById('forgotForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('forgotEmail').value.trim();
  const messageDiv = document.getElementById('forgot-message');
  messageDiv.textContent = '';
  if (!email) {
    messageDiv.textContent = 'Please enter your email address.';
    messageDiv.style.color = 'crimson';
    return;
  }
  messageDiv.textContent = 'Sending reset link...';
  messageDiv.style.color = '#2563eb';

  try {
    // Simulate async request (replace with real API/Firebase call)
    await new Promise(res => setTimeout(res, 1200));
    // Example: await firebase.auth().sendPasswordResetEmail(email);
    messageDiv.textContent = 'If this email is registered, a reset link has been sent!';
    messageDiv.style.color = 'green';
  } catch (err) {
    messageDiv.textContent = 'Failed to send reset link. Please try again.';
    messageDiv.style.color = 'crimson';
  }
});