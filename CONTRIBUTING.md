# 🤝 Welcome to the Job Junction Contribution Guide

Thanks for your interest in contributing to **Job Junction** – an open-source, beginner-friendly job portal built using **HTML**, **CSS**, **JavaScript**, and **Firebase**.  
This guide is written to help both **first-time contributors** and experienced developers contribute confidently and efficiently.

If you're part of **GirlScript Summer of Code (GSSoC)** or just exploring open source, this file will walk you through everything you need to know.

---

## 💡 What Is Job Junction?

Job Junction is a clean and modern job portal that lets users:
- Explore job opportunities (planned)
- Navigate through different dashboards
- Experience a responsive UI with Firebase-powered authentication (in progress)

🔗 [Live Preview](https://surajsg23.github.io/Job-Portal/)  
📦 [Source Code](https://github.com/SurajSG23/Job-Portal)

---

## 📌 Tech Stack

| Layer              | Tech Stack Used                            |
|--------------------|---------------------------------------------|
| Structure (UI)     | HTML5                                       |
| Styling            | CSS3, SCSS                                  |
| Behavior           | JavaScript (Vanilla)                        |
| Authentication     | Firebase (Login/Signup – WIP)               |
| UI Tools           | Font Awesome, Google Fonts (Poppins)        |

---

## 🚀 Getting Started (For Local Development)

> ⚠️ Recommended: Use [VS Code](https://code.visualstudio.com/) and install the **Live Server** extension.

### 🧾 Clone the Repository

```bash
git clone https://github.com/<your-username>/Job-Portal.git
cd Job-Portal
````

### 🌐 Run Locally

With VS Code:

1. Install the **Live Server** extension.
2. Right-click on `index.html` → “Open with Live Server”.

Your browser will open the site locally!

---

## 🧑‍💻 How to Contribute (Step-by-Step)

Whether you're fixing a bug, updating UI, or improving docs, follow these steps:

---

### 1️⃣ Fork This Repository

Click the **"Fork"** button (top-right corner of the repo page).
This creates a personal copy of the repository under your account.

---

### 2️⃣ Clone Your Fork Locally

```bash
git clone https://github.com/<your-username>/Job-Portal.git
cd Job-Portal
```

---

### 3️⃣ Create a Feature Branch

> Never commit directly to `main`. Always work on a new branch.

```bash
git checkout -b feat/your-feature-name
```

Examples:

* `feat/navbar-animation`
* `fix/footer-overflow`
* `docs/update-readme`

---

### 4️⃣ Make Your Changes

Open the project in your code editor and make the necessary changes.

> 🧠 Tip: Follow the structure and naming patterns already used.

---

### 5️⃣ Stage & Commit

```bash
git add .
git commit -m "feat: added seeker dashboard UI"
```

Use **meaningful commit messages**. Recommended types:

* `feat:` – New feature
* `fix:` – Bug fix
* `docs:` – Documentation only
* `style:` – Visual or layout changes
* `refactor:` – Code restructuring without functionality change
* `chore:` – Maintenance, build changes, etc.

---

### 6️⃣ Push to GitHub

```bash
git push origin feat/your-feature-name
```

---

### 7️⃣ Open a Pull Request (PR)

Go to your forked repo on GitHub:

* Click **“Compare & Pull Request”**
* Add a **clear title**
* In the description, explain:

  * What you changed
  * Why it's useful
  * If it fixes an issue (e.g., "Closes #12")

> 💬 Be respectful, clear, and responsive to reviewer comments.

---

## 🔍 What Can I Work On?

You can look for issues labeled:

* `Level 1` – Beginner-friendly
* `Level 2` – Intermediate
* `Level 3` – Advanced

Things you could help with:

* 🔧 Fix layout issues
* 🎨 Improve responsiveness (mobile/tablet)
* 🔐 Integrate Firebase login (WIP)
* 📚 Add better documentation
* 🧪 Add components (search bar, filters, job cards)
* 🧰 Refactor or optimize JS code

---

## 📂 Folder Structure (Quick Peek)

```
JOB-PORTAL/
├── assets/         → Images, logos
├── components/     → HTML/CSS/JS partials
├── index.html      → Landing page
├── style.css       → Main CSS
├── script.js       → General JS logic
└── README.md       → Project overview
```

---

## 🎨 Style Guidelines

* Use semantic HTML (`<section>`, `<main>`, etc.)
* Stick to existing naming conventions (camelCase or kebab-case)
* Keep indentation consistent (2 or 4 spaces, match existing)
* Write CSS/SCSS modularly (use comments if needed)
* JavaScript should be clean and commented if complex

---

## ❓ FAQs

**Q: I’m new. Can I contribute?**
Yes! We welcome new contributors — especially GSSoC participants.

**Q: Do I need to use Firebase?**
Not unless you're contributing to the auth system. Frontend-only tasks are welcome!

**Q: Should I open an issue before submitting PR?**
It's a good practice, especially for features/bugs. For small fixes, PRs are fine directly.

**Q: How do I sync my fork with the original repo?**

```bash
git remote add upstream https://github.com/SurajSG23/Job-Portal.git
git fetch upstream
git merge upstream/main
```

---

## 🙌 Community & Support

| Channel            | Purpose                          |
| ------------------ | -------------------------------- |
| GitHub Issues      | Bug reports, feature suggestions |
| GitHub Discussions | Q\&A, brainstorming, feedback    |
| Discord (GSSoC)    | Real-time help, networking       |

---

## 🛡️ License

This project is licensed under the **MIT License**.

---

## 🌟 Final Note

We’re building Job Junction with love — one line of code at a time.
If you’re learning, experimenting, or just want to help — **you’re welcome here**. Your contribution, no matter how small, **makes a difference**. ✨

> ⭐ Don’t forget to **star** the repo and spread the word.
> Let's build something amazing, together.

Happy coding! 💻
— *The Job Junction Team*