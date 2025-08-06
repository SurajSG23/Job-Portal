function Redirect(){
    window.location.href = "components/homepage.html"
}
function toggleBookmark(button) {
  button.classList.toggle('saved');
  const icon = button.querySelector('i');
  if (button.classList.contains('saved')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
}
