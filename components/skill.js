// skill.js

const skillInput = document.getElementById("skillInput");
const suggestionsList = document.getElementById("suggestions");
const tagContainer = document.getElementById("tag-container");

const skills = [
  // --- Technical Skills ---
  "JavaScript", "Python", "Java", "HTML", "CSS", "C++", "React", "Node.js",
  "Angular", "Django", "SQL", "NoSQL", "MongoDB", "Git", "DevOps",
  "Machine Learning", "AI", "Firebase", "PHP", "TypeScript",
  "Flask", "Spring Boot", "Kotlin", "Swift", "Ruby", "Rust", "Go",
  "Bootstrap", "Tailwind CSS", "jQuery", "SASS", "Webpack",
  "Express.js", "Next.js", "Vue.js", "Nuxt.js", "REST API", "GraphQL",
  "PostgreSQL", "SQLite", "Redis", "Oracle DB",
  "AWS", "Azure", "Google Cloud", "Heroku", "Netlify", "Vercel",
  "CI/CD", "Docker", "Kubernetes", "Jenkins", "Terraform",
  "Pandas", "NumPy", "OpenCV", "TensorFlow", "PyTorch", "Keras",
  "Linux", "Bash", "Figma", "UI/UX Design",

  // --- Soft Skills ---
  "Communication", "Teamwork", "Problem-Solving", "Leadership",
  "Time Management", "Critical Thinking", "Adaptability", "Creativity",
  "Conflict Resolution", "Work Ethic", "Decision Making", "Attention to Detail",
  "Emotional Intelligence", "Collaboration", "Project Management",
  "Public Speaking", "Self-Motivation", "Negotiation", "Stress Management",
  "Empathy", "Interpersonal Skills", "Growth Mindset", "Presentation Skills"
];

let selectedSkills = [];

skillInput.addEventListener("input", () => {
  const inputValue = skillInput.value.toLowerCase().trim();
  suggestionsList.innerHTML = "";

  if (inputValue === "") return;

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().startsWith(inputValue) &&
    !selectedSkills.includes(skill)
  );

  filteredSkills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    li.addEventListener("click", () => addSkillTag(skill));
    suggestionsList.appendChild(li);
  });
});

skillInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && skillInput.value.trim() !== "") {
    e.preventDefault();
    const input = skillInput.value.trim();
    if (!selectedSkills.includes(input)) addSkillTag(input);
  }
});

function addSkillTag(skill) {
  selectedSkills.push(skill);

  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.innerHTML = `${skill}<span class="remove-tag" onclick="removeTag('${skill}')">×</span>`;
  tagContainer.appendChild(tag);

  skillInput.value = "";
  suggestionsList.innerHTML = "";
}

function removeTag(skill) {
  selectedSkills = selectedSkills.filter(s => s !== skill);
  [...tagContainer.children].forEach(child => {
    if (child.textContent.includes(skill)) child.remove();
  });
}
