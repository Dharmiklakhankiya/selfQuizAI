# 🧠 SelfQuizAI

**SelfQuizAI** is an AI-powered quiz generation app that creates **custom multiple-choice quizzes on any topic** using **Google Gemini**. Built with a sleek React frontend and a robust Node.js backend, SelfQuizAI lets you test your knowledge, track your history, and level up your learning — one quiz at a time.

---

## 🚀 Features

- 🤖 **AI-Generated Quizzes** — Custom questions powered by Google Gemini  
- 🎚️ **Difficulty Levels** — Choose from *Easy*, *Medium*, or *Hard*  
- 🔐 **User Authentication** — Secure login system using JWT  
- 📜 **Quiz History** — Track all your past quizzes  
- 🧩 **Interactive UI** — Live scoring, timers, and smooth transitions  
- 📱 **Responsive Design** — Works on both desktop and mobile

---

## 🌐 Live Deployment
🚀 Check it out in action:
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-green?style=for-the-badge)](https://self-quiz-ai.vercel.app)

---

## 📋 Prerequisites

Before running the app, make sure you have:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Google Gemini API Key](https://ai.google.dev/)

---

## 🔧 Installation

### 🔥 Quick Setup (Recommended)

Use our OS-specific setup scripts to install everything in one go:

#### 🪟 Windows
```bash
setup.bat
```

#### 🍏 macOS
```bash
chmod +x setup.command
./setup.command
```

#### 🐧 Linux
```bash
chmod +x setup.sh
./setup.sh
```

---

### 🛠️ Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/selfquizai.git
   cd selfquizai
   ```

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in both `client/` and `server/` folders:

   **server/.env**
   ```
   GEMINI_API_KEY=your_gemini_api_key
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   **client/.env**
   *(Add client-specific environment vars if needed)*

---

## 🎮 Usage

### 🔧 Development Mode

Run both client and server in development:

#### 🪟 Windows
```bash
start-dev.bat
```

#### 🍏 macOS
```bash
chmod +x start-dev.command
./start-dev.command
```

#### 🐧 Linux
```bash
chmod +x start-dev.sh
./start-dev.sh
```

---

### 🖐️ Manual Start

Start server:
```bash
cd server
npm run dev
```

Start client:
```bash
cd client
npm run dev
```

Then go to:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 📱 App Workflow

1. **Register/Login** — Secure access to features  
2. **Create a Quiz** — Enter topic, difficulty & number of questions  
3. **Take the Quiz** — Live scoring and real-time feedback  
4. **View History** — Revisit any quiz you've ever generated

---

## 🔒 Security Notes

- Don’t commit your `.env` files — your secrets are not for GitHub.
- JWT secret should be long, random, and locked down.
- Your Gemini API key = 🔑. Keep it private.

---

## 🧪 Technologies Used

| Tech Stack | Description |
|------------|-------------|
| **Frontend** | React, React Router, Tailwind CSS, Vite |
| **Backend**  | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **Auth**     | JWT (JSON Web Tokens) |
| **AI**       | Google Gemini for question generation |

---

## 🤝 Contributing

Contributions welcome! Fork it, clone it, fix it, PR it. We appreciate it!

---

## 📝 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Dharmik Lakhankiya**  
📎 [LinkedIn](https://www.linkedin.com/in/dharmik-l-7b9865250/)

---

## 🙏 Acknowledgments

- 🧠 Google Gemini — powering smart quiz generation  
- 💻 React & Node.js communities — for making dev beautiful

---
