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