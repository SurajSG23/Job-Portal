function Redirect(){
    window.location.href = "components/homepage.html"
}
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy-image");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");  
        img.onload = () => img.classList.add("fade-in"); 
        observer.unobserve(img); 
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  lazyImages.forEach(img => {
    img.onerror = () => {
      img.src = "assets/placeholder.png";
    };
  });
});
