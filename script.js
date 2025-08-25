function Redirect(){
    window.location.href = "components/homepage.html"
}
document.addEventListener("DOMContentLoaded", () => {
  const jobList = document.getElementById("job-list");
  const jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(card => {
    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      saveJobOrder();
    });
  });

  jobList.addEventListener("dragover", e => {
    e.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(jobList, e.clientY);
    if (afterElement == null) {
      jobList.appendChild(draggingCard);
    } else {
      jobList.insertBefore(draggingCard, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".job-card:not(.dragging)")];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function saveJobOrder() {
    const order = [...jobList.querySelectorAll(".job-card")].map(card => card.textContent);
    localStorage.setItem("jobOrder", JSON.stringify(order));
  }

  // Load saved order
  function loadJobOrder() {
    const savedOrder = JSON.parse(localStorage.getItem("jobOrder"));
    if (savedOrder) {
      savedOrder.forEach(text => {
        const card = [...document.querySelectorAll(".job-card")].find(c => c.textContent === text);
        if (card) jobList.appendChild(card);
      });
    }
  }
  loadJobOrder();

  
  const filterPanel = document.getElementById("filter-panel");
  const pinBtn = document.getElementById("pin-panel");
  const resizeBtn = document.getElementById("resize-panel");

  pinBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("pinned");
    localStorage.setItem("panelPinned", filterPanel.classList.contains("pinned"));
  });

  resizeBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("resized");
    localStorage.setItem("panelResized", filterPanel.classList.contains("resized"));
  });

  // Restore filter panel state
  if (localStorage.getItem("panelPinned") === "true") {
    filterPanel.classList.add("pinned");
  }
  if (localStorage.getItem("panelResized") === "true") {
    filterPanel.classList.add("resized");
  }
});
