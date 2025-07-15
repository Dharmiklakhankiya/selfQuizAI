import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 text-[#e0e7ff]">
      <div className="w-full max-w-5xl mx-auto pt-6">
        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#7f7fd5] to-[#f7971e] drop-shadow-[0_2px_20px_#00f2fe] animate-pulse">
          About <span className="text-[#39ff14]">SelfQuizAI</span>
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-[#e0e7ff] bg-[#181c2f]/70 rounded-xl p-6 shadow-lg border border-[#39ff14]/30">
          <strong className="text-[#39ff14]">SelfQuizAI</strong> is your futuristic AI quiz generator for students, educators, and lifelong learners. Instantly create neon-bright, topic-specific quizzes powered by{" "}
          <strong className="text-[#00f2fe]">Google Gemini</strong>. Learn at the speed of light—smarter, not harder.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] via-[#00f2fe] to-[#f7971e] drop-shadow-[0_2px_10px_#00f2fe]">
          ✨ Key Features
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg pl-4">
          <li className="text-[#00f2fe] font-semibold">🎯 Topic-based quiz generation with Google Gemini</li>
          <li className="text-[#39ff14] font-semibold">⚙️ Fully customizable: difficulty, timer, question count, and more</li>
          <li className="text-[#f7971e] font-semibold">🔐 Secure JWT-authenticated accounts</li>
          <li className="text-[#ff00cc] font-semibold">⏱️ Real-time neon timers, instant scoring, and performance summary</li>
          <li className="text-[#00f2fe] font-semibold">💡 Ultra-clean, responsive UI with React & Tailwind CSS</li>
          <li className="text-[#39ff14] font-semibold">🧠 Lightning-fast backend: Node.js, Express, MongoDB</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00cc] via-[#00f2fe] to-[#39ff14] drop-shadow-[0_2px_10px_#ff00cc]">
          👨‍💻 Meet the Developer
        </h2>
        <p className="mb-8 text-lg bg-[#181c2f]/70 rounded-xl p-6 border border-[#ff00cc]/30 shadow-lg">
          Hey, I’m <strong className="text-[#ff00cc]">Dharmik Lakhankiya</strong> — a full-stack developer obsessed with clean UI, efficient backends, and the magic of AI in education. SelfQuizAI is my neon-lit vision for smarter, more engaging learning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 text-[#00f2fe] font-semibold mb-8">
          <a
            href="mailto:dharmiklakhankiya@gmail.com"
            className="relative group neon-link hover:text-[#39ff14] transition drop-shadow-[0_2px_10px_#00f2fe]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#00f2fe] animate-pulse z-0"></span>
            <span className="relative z-10">📧 dharmiklakhankiya@gmail.com</span>
          </a>
          <a
            href="https://github.com/Dharmiklakhankiya"
            className="relative group neon-link hover:text-[#f7971e] transition drop-shadow-[0_2px_10px_#00f2fe]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 bg-gradient-to-r from-[#f7971e] via-[#00f2fe] to-[#f7971e] animate-pulse z-0"></span>
            <span className="relative z-10">💻 GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dharmik-l-7b9865250/"
            className="relative group neon-link hover:text-[#ff00cc] transition drop-shadow-[0_2px_10px_#00f2fe]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 bg-gradient-to-r from-[#ff00cc] via-[#00f2fe] to-[#39ff14] animate-pulse z-0"></span>
            <span className="relative z-10">🔗 LinkedIn</span>
          </a>
        </div>

        <footer className="mt-16 text-base text-[#e0e7ff] text-center opacity-90">
          <span className="inline-block px-6 py-2 rounded-xl bg-gradient-to-r from-[#00f2fe]/30 via-[#39ff14]/20 to-[#ff00cc]/30 shadow-lg border border-[#00f2fe]/40 drop-shadow-[0_2px_10px_#00f2fe] animate-pulse">
            &copy; {new Date().getFullYear()} <span className="text-[#39ff14] font-bold">SelfQuizAI</span> · Built by <span className="text-[#ff00cc] font-bold">Dharmik Lakhankiya</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default About;
