'use client';

import Image from "next/image";
import { FaHeart, FaStar, FaCloud, FaGithub, FaInstagram, FaTiktok, FaShieldAlt, FaCode, FaRocket, FaServer, FaCog, FaLightbulb, FaTools, FaCubes, FaBolt, FaMagic, FaAtom, FaGamepad, FaTrophy } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Typing game logic
    let gameActive = false;
    let startTime: number;
    let currentWPM = 0;
    let currentAccuracy = 100;
    let bestWPM = parseInt(localStorage.getItem('typingGameBestWPM') || '0');
    let currentText = '';
    let typedText = '';

    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const bestWPMElement = document.getElementById('best-wpm');
    const startButton = document.getElementById('start-game');
    const gameMessage = document.getElementById('game-message');
    const codeDisplay = document.getElementById('code-display');
    const codeTextElement = document.getElementById('code-text');
    const typingInput = document.getElementById('typing-input') as HTMLTextAreaElement;
    const progressBar = document.getElementById('progress-bar');

         // Code snippets for typing challenges
     const codeSnippets = [
       `const hello = () => {
  console.log("Hello, World!");
  return "Welcome to coding!";
};`,
       `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
       `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];`,
       `async function getData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}`,
       `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};`,
       `class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return b !== 0 ? a / b : 0; }
}`
     ];

    // Initialize best WPM display
    if (bestWPMElement) {
      bestWPMElement.textContent = bestWPM.toString();
    }

    function startGame() {
      gameActive = true;
      startTime = Date.now();
      currentText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      typedText = '';
      
      if (gameMessage) gameMessage.style.display = 'none';
      if (codeDisplay) codeDisplay.classList.remove('hidden');
      if (codeTextElement) {
        codeTextElement.innerHTML = highlightText(currentText, '');
      }
      if (typingInput) {
        typingInput.value = '';
        typingInput.focus();
      }
      if (progressBar) progressBar.style.width = '0%';
      
      updateStats();
    }

    function highlightText(original: string, typed: string) {
      let result = '';
      for (let i = 0; i < original.length; i++) {
        const char = original[i];
        const escapedChar = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char === '&' ? '&amp;' : char;
        
        if (i < typed.length) {
          if (original[i] === typed[i]) {
            result += `<span class="text-green-400">${escapedChar}</span>`;
          } else {
            result += `<span class="text-red-400 bg-red-900/30">${escapedChar}</span>`;
          }
        } else if (i === typed.length) {
          result += `<span class="bg-purple-500/50 text-white animate-pulse">${escapedChar}</span>`;
        } else {
          result += `<span class="text-slate-400">${escapedChar}</span>`;
        }
      }
      return result;
    }

    function calculateWPM() {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = typedText.length / 5; // standard: 5 characters = 1 word
      return Math.round(wordsTyped / timeElapsed) || 0;
    }

    function calculateAccuracy() {
      if (typedText.length === 0) return 100;
      let correct = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) correct++;
      }
      return Math.round((correct / typedText.length) * 100);
    }

    function updateStats() {
      currentWPM = calculateWPM();
      currentAccuracy = calculateAccuracy();
      
      if (wpmElement) wpmElement.textContent = currentWPM.toString();
      if (accuracyElement) accuracyElement.textContent = currentAccuracy.toString();
      
      // Update progress bar
      const progress = (typedText.length / currentText.length) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
    }

    function endGame() {
      gameActive = false;
      
      // Check for best WPM
      if (currentWPM > bestWPM && currentAccuracy >= 90) {
        bestWPM = currentWPM;
        localStorage.setItem('typingGameBestWPM', bestWPM.toString());
        if (bestWPMElement) bestWPMElement.textContent = bestWPM.toString();
      }
      
      // Show end game message
      if (gameMessage && codeDisplay) {
        codeDisplay.classList.add('hidden');
        gameMessage.style.display = 'flex';
        gameMessage.innerHTML = `
          <div class="text-center">
            <div class="text-6xl mb-4">${currentWPM > 40 ? '🚀' : currentWPM > 20 ? '⚡' : '⌨️'}</div>
            <p class="text-2xl font-bold text-slate-800 mb-2">Challenge Complete!</p>
            <p class="text-xl text-slate-600 mb-2">WPM: ${currentWPM} | Accuracy: ${currentAccuracy}%</p>
            ${currentWPM === bestWPM && currentAccuracy >= 90 ? '<p class="text-lg text-purple-600 font-semibold mb-4">🏆 New Best WPM!</p>' : ''}
            <button id="play-again" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple hover:-translate-y-2">
              Try Another Challenge
            </button>
          </div>
        `;
        
        const playAgainButton = document.getElementById('play-again');
        if (playAgainButton) {
          playAgainButton.addEventListener('click', startGame);
        }
      }
    }

    function handleTyping(event: Event) {
      if (!gameActive) return;
      
      const target = event.target as HTMLTextAreaElement;
      typedText = target.value;
      
      if (codeTextElement) {
        codeTextElement.innerHTML = highlightText(currentText, typedText);
      }
      
      updateStats();
      
      // Check if completed
      if (typedText.length >= currentText.length && typedText === currentText) {
        setTimeout(() => endGame(), 500); // Small delay to show completion
      }
    }

    // Event listeners
    if (startButton) {
      startButton.addEventListener('click', startGame);
    }
    
    if (typingInput) {
      typingInput.addEventListener('input', handleTyping);
    }

    // Cleanup function
    return () => {
      if (typingInput) {
        typingInput.removeEventListener('input', handleTyping);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-pink-500/5 to-blue-500/5"></div>
        <div className="absolute inset-0 bg-gradient-waves bg-bottom bg-no-repeat opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-dots bg-dots animate-pulse-subtle"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }}></div>
        
        {/* Interactive Floating Elements */}
        <div className="absolute top-32 left-1/4 text-purple-400 animate-float opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer">
          <FaAtom size={45} className="hover:text-purple-600" />
        </div>
        <div className="absolute top-40 right-1/4 text-accent-pink animate-bounce-subtle opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer">
          <FaBolt size={35} className="hover:text-pink-600" />
        </div>
        <div className="absolute bottom-1/4 left-1/5 text-accent-lavender animate-pulse-subtle opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer">
          <FaMagic size={28} className="hover:text-blue-600" />
        </div>
        <div className="absolute top-1/2 right-1/5 text-purple-400 animate-spin-slow opacity-30 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer">
          <FaCog size={55} className="hover:text-purple-600" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-accent-peach animate-float opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer" style={{ animationDelay: "1.5s" }}>
          <FaRocket size={30} className="hover:text-orange-600" />
        </div>
        <div className="absolute top-1/3 left-1/6 text-purple-500 animate-pulse-subtle opacity-40 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer" style={{ animationDelay: "2.5s" }}>
          <FaTools size={32} className="hover:text-purple-700" />
        </div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 animate-morph rounded-3xl backdrop-blur-sm"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-tr from-accent-peach/10 to-accent-lavender/10 animate-morph rounded-full backdrop-blur-sm" style={{ animationDelay: "2s" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="mb-8 inline-block opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "200ms" }}>
              <div className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple border border-purple-200/50 backdrop-blur-sm">
                <span className="mr-2">🚀</span>
                Founder & Platform Engineer
                <span className="ml-2 animate-bounce-subtle">⚡</span>
              </div>
            </div>
            
            {/* Main Title with Enhanced Effects */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-8 tracking-tight text-slate-800 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "400ms" }}>
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200 relative z-10">
                Angelina
                </span>
                {/* Glowing underline */}
                <span className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-pulse-subtle"></span>
                {/* Sparkle effects */}
                <span className="absolute -top-2 -right-2 text-yellow-400 animate-bounce-subtle text-2xl">✨</span>
                <span className="absolute -bottom-2 -left-2 text-purple-400 animate-pulse-subtle text-xl">💫</span>
              </span>
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-xl sm:text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "600ms" }}>
              As a <span className="font-semibold text-purple-600 relative">
                founder
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400 rounded-full"></span>
              </span>, I build <span className="font-semibold text-pink-600 relative">
                platforms
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-400 rounded-full"></span>
              </span>, solve <span className="font-semibold text-blue-600 relative">
                complex problems
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></span>
              </span>, and create <span className="font-semibold text-orange-600 relative">
                tools
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full"></span>
              </span> that make developers' lives easier. From scaling startups to enterprise solutions, I love turning ambitious ideas into reality.
            </p>
            
            {/* Enhanced CTAs */}
            <div className="flex flex-wrap justify-center gap-6 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "800ms" }}>
              <a
                href="/projects"
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple hover:-translate-y-3 text-sm uppercase tracking-wider overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="group-hover:mr-2 transition-all duration-300">See What I Build</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">⚡</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
              </a>
              <a
                href="/blog"
                className="group relative px-12 py-5 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-purple hover:-translate-y-3 border-2 border-purple-200 hover:border-purple-400 text-sm uppercase tracking-wider overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="group-hover:mr-2 transition-all duration-300">Read My Thoughts</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">💭</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="mt-12 flex flex-wrap justify-center space-x-6 sm:space-x-8 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "1000ms" }}>
              {[
                { href: 'https://www.linkedin.com/in/angelina-aziz-8088051a7/', label: 'LinkedIn', icon: '🔗', color: 'hover:text-blue-600' },
                { href: 'https://twitter.com/angelinxaziz', label: 'Twitter', icon: '🐦', color: 'hover:text-sky-500' },
                { href: 'https://github.com/angelinaaziz', label: 'GitHub', icon: '💻', color: 'hover:text-gray-800' },
                { href: 'https://www.instagram.com/angelina_codes/', label: 'Instagram', icon: '📸', color: 'hover:text-pink-600' },
                { href: 'https://www.tiktok.com/@angelina.codes', label: 'TikTok', icon: '📱', color: 'hover:text-black' },
                { href: '/blog', label: 'Blog', icon: '✍️', color: 'hover:text-purple-600' }
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`group text-slate-700 ${link.color} transition-all duration-300 hover:-translate-y-2 mb-3 font-medium`}
                >
                  <span className="inline-block mr-3 group-hover:animate-bounce-subtle text-xl">{link.icon}</span>
                  <span className="group-hover:underline underline-offset-4">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Game Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-30"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-8 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "200ms" }}>
            Want to Play a Game?
            <span className="inline-block ml-4 text-5xl animate-bounce-subtle">🎮</span>
          </h2>
          
          <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "400ms" }}>
            Think you can code faster than a caffeinated developer at 2 AM? ☕ Let's find out! Type the code as fast and accurately as you can.
          </p>
          
          {/* Game Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "600ms" }}>
            <div id="game-container" className="relative">
              {/* Game Stats */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600" id="wpm">0</div>
                  <div className="text-sm text-slate-600">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600" id="accuracy">100</div>
                  <div className="text-sm text-slate-600">Accuracy %</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600" id="best-wpm">0</div>
                  <div className="text-sm text-slate-600">Best WPM</div>
                </div>
              </div>
              
              {/* Game Area */}
              <div 
                id="game-area" 
                className="relative w-full bg-slate-900 rounded-2xl border-2 border-purple-200 overflow-hidden p-6"
                style={{ minHeight: '400px' }}
              >
                <div id="game-message" className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce-subtle">⌨️</div>
                    <p className="text-xl text-slate-700 mb-4">Ready to test your typing speed?</p>
                    <button 
                      id="start-game" 
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple hover:-translate-y-2"
                    >
                      Start Typing Challenge
                    </button>
                  </div>
                </div>
                
                {/* Code Display */}
                <div id="code-display" className="hidden">
                  <div className="bg-slate-800 rounded-lg p-4 mb-4 font-mono text-sm">
                    <div className="flex items-center mb-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="ml-4 text-slate-400 text-xs">main.js</div>
                    </div>
                    <div id="code-text" className="text-slate-300 leading-relaxed whitespace-pre-wrap"></div>
                  </div>
                  
                  {/* Input Area */}
                  <textarea
                    id="typing-input"
                    className="w-full h-32 bg-slate-800 text-white font-mono text-sm p-4 rounded-lg border-2 border-slate-600 focus:border-purple-500 focus:outline-none resize-none leading-relaxed"
                    placeholder="Start typing the code above..."
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  ></textarea>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 bg-slate-700 rounded-full h-2">
                    <div id="progress-bar" className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Game Controls */}
              <div className="mt-6 flex justify-center gap-4">
                <button 
                  id="restart-game" 
                  className="px-6 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 hidden"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Love Building Section - Matching Site Style */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Sparkle Effect */}
          <div className="text-center mb-20">
            <div className="inline-block relative mb-8 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "100ms" }}>
              <h2 className="text-5xl sm:text-7xl font-black text-slate-800 leading-relaxed">
                What I Love
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient bg-size-200 relative pb-2">
                  Building
                  <span className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</span>
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "300ms" }}>
              From scalable platforms to developer tools, I'm passionate about creating solutions that make a real impact. Here's what gets me excited every day:
            </p>
          </div>
          
          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Platform Engineering",
                description: "Building robust, scalable platforms that empower teams to ship faster and more reliably. From infrastructure automation to developer experience tools.",
                icon: "🏗️",
                delay: 400,
                gradient: "from-purple-500/10 to-purple-600/10",
                border: "border-purple-200/50",
                glow: "group-hover:shadow-purple-200/50"
              },
              {
                title: "Full-Stack Development",
                description: "Creating end-to-end solutions with modern frameworks. I love bringing ideas to life with clean code and beautiful user experiences.",
                icon: "💻",
                delay: 500,
                gradient: "from-pink-500/10 to-pink-600/10",
                border: "border-pink-200/50",
                glow: "group-hover:shadow-pink-200/50"
              },
              {
                title: "Cloud Architecture",
                description: "Designing and implementing cloud-native solutions that scale. AWS, Azure, and everything in between to build the future.",
                icon: "☁️",
                delay: 600,
                gradient: "from-blue-500/10 to-blue-600/10",
                border: "border-blue-200/50",
                glow: "group-hover:shadow-blue-200/50"
              },
              {
                title: "Developer Tools",
                description: "Building tools and automation that make developers' lives easier. Because great tools lead to great products.",
                icon: "🛠️",
                delay: 700,
                gradient: "from-orange-500/10 to-orange-600/10",
                border: "border-orange-200/50",
                glow: "group-hover:shadow-orange-200/50"
              },
              {
                title: "Problem Solving",
                description: "I thrive on tackling complex challenges and finding elegant solutions. Every problem is an opportunity to learn and innovate.",
                icon: "🧩",
                delay: 800,
                gradient: "from-green-500/10 to-green-600/10",
                border: "border-green-200/50",
                glow: "group-hover:shadow-green-200/50"
              },
              {
                title: "Innovation & Growth",
                description: "Always exploring new technologies and pushing boundaries. From startups to enterprise, I love building what's next.",
                icon: "🚀",
                delay: 900,
                gradient: "from-indigo-500/10 to-indigo-600/10",
                border: "border-indigo-200/50",
                glow: "group-hover:shadow-indigo-200/50"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative opacity-0 animate-fade-in transition-opacity duration-700"
                style={{ animationFillMode: 'forwards', animationDelay: `${item.delay}ms` }}
              >
                {/* Magnetic Card Effect */}
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border ${item.border} shadow-xl hover:shadow-2xl ${item.glow} transition-all duration-500 hover:-translate-y-6 hover:rotate-1 h-full group-hover:bg-white/90`}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Icon with Bounce */}
                  <div className="relative z-10 text-5xl mb-6 group-hover:scale-125 group-hover:animate-bounce-subtle transition-transform duration-500">
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action - Reverted to Original Colors */}
      <section className="py-24 bg-gradient-to-r from-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-30"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-12 leading-relaxed">
            Let's Build Something 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-4 pb-4">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you have an idea, a problem to solve, or just want to chat about tech, I'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:angelinaaziz1@gmail.com"
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:-translate-y-2 shadow-2xl hover:shadow-purple text-lg"
            >
              <span className="mr-3">Get In Touch</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block text-xl">💌</span>
            </a>
            <a
              href="/projects"
              className="group px-10 py-5 bg-white text-purple-700 rounded-full font-bold hover:bg-purple-50 transition-all duration-300 hover:-translate-y-2 shadow-2xl border-2 border-purple-200 hover:border-purple-400 text-lg"
            >
              <span className="mr-3">View My Work</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block text-xl">🚀</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
