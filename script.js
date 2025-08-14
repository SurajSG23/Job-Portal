function Redirect(){
    window.location.href = "components/homepage.html"
}
document.addEventListener("DOMContentLoaded", function () {
  const messagesContainer = document.getElementById("chatbot-messages");
  const inputField = document.getElementById("chatbot-input");
  const sendButton = document.getElementById("chatbot-send");

  const jobData = [
    { title: "Frontend Developer", location: "Remote" },
    { title: "Backend Engineer", location: "New York" },
    { title: "UI/UX Designer", location: "Remote" },
    { title: "Data Analyst", location: "San Francisco" }
  ];

 
  let conversation = JSON.parse(sessionStorage.getItem("chatConversation")) || [];

  conversation.forEach(msg => addMessage(msg.text, msg.sender));

  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chatbot-message", sender);
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    conversation.push({ text, sender });
    sessionStorage.setItem("chatConversation", JSON.stringify(conversation));
  }

  function botReply(userText) {
    let lowerText = userText.toLowerCase();

    if (lowerText.includes("job") || lowerText.includes("developer")) {
      const matchedJobs = jobData.filter(job =>
        lowerText.includes(job.title.toLowerCase().split(" ")[0])
      );
      if (matchedJobs.length > 0) {
        addMessage(`Here are some jobs you might like: ${matchedJobs.map(j => `${j.title} (${j.location})`).join(", ")}`, "bot");
      } else {
        addMessage("I found some great roles: " + jobData.map(j => `${j.title} (${j.location})`).join(", "), "bot");
      }
    } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      addMessage("Hi there! How can I help you find a job today?", "bot");
    } else if (lowerText.includes("thanks")) {
      addMessage("You're welcome! 😊", "bot");
    } else {
      addMessage("I'm not sure about that, but I can help you search for jobs. Try asking for 'developer jobs' or 'remote work'.", "bot");
    }
  }

  function handleUserInput() {
    const userText = inputField.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    inputField.value = "";

    setTimeout(() => botReply(userText), 500); // Simulate typing delay
  }

  sendButton.addEventListener("click", handleUserInput);
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleUserInput();
  });

  if (conversation.length === 0) {
    addMessage("Hello! I'm your Job Junction Assistant. What kind of job are you looking for?", "bot");
  }
});
