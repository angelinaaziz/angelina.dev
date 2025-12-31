'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<any[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const terminalContent = [
    { text: '$ whoami', type: 'command' },
    { text: 'angelina aziz - senior platform engineer', type: 'output' },
    { text: '$ cat role.txt', type: 'command' },
    { text: 'infrastructure for agentic AI @ v7 labs', type: 'output' },
    { text: '$ ls expertise/', type: 'command' },
    { text: 'aws/ azure/ kubernetes/ terraform/ observability/', type: 'output' },
    { text: '$ cat startup.txt', type: 'command' },
    { text: 'auralyze.ai - techstars atlanta 24, $120k raised', type: 'output' },
    { text: '$ cat motto.txt', type: 'command' },
    { text: 'ship it, monitor it, fix it before anyone notices', type: 'output' },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= terminalContent.length) return;

    const currentLine = terminalContent[currentLineIndex];
    const fullText = currentLine.text;

    if (currentCharIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, currentLine.type === 'command' ? 40 : 15);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, { ...currentLine, text: fullText }]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.type === 'command' ? 300 : 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const timeline = [
    {
      year: '2020',
      title: 'First Steps',
      role: 'Apprentice Software Engineer',
      company: 'BNY Mellon',
      description: 'Enterprise Java, Oracle databases, and learning how large-scale financial systems work.',
      type: 'job',
      tags: ['Java', 'SQL', 'Spring Boot']
    },
    {
      year: '2021',
      title: 'Level Up',
      role: 'Platform Engineer',
      company: 'Anaplan',
      description: 'CI/CD pipelines for 500+ engineers, multi-cloud infrastructure on AWS/GCP.',
      type: 'job',
      tags: ['AWS', 'GCP', 'Terraform', 'K8s']
    },
    {
      year: '2023',
      title: 'Going Senior',
      role: 'Senior Platform Engineer',
      company: 'Legal & General',
      description: 'Incident response, observability, and getting very familiar with PagerDuty at 3am.',
      type: 'job',
      tags: ['SRE', 'Observability', 'Python']
    },
    {
      year: '2023',
      title: 'Building My Own Thing',
      role: 'Co-Founder',
      company: 'Auralyze.ai',
      description: 'AI interview prep platform. Now at 10,000+ users.',
      type: 'startup',
      tags: ['Next.js', 'LLMs', 'Product']
    },
    {
      year: '2024',
      title: 'Techstars',
      role: 'Funded!',
      company: 'Auralyze.ai',
      description: 'Techstars Atlanta (<1% acceptance). Raised $120k pre-seed.',
      type: 'milestone',
      tags: ['Startup', 'Growth', 'Pitching']
    },
    {
      year: '2025',
      title: 'New Chapter',
      role: 'Senior DevOps Engineer',
      company: 'Multiverse',
      description: 'Azure infrastructure for AI apprenticeship platform. Short stint.',
      type: 'job',
      tags: ['Azure', 'Cloud Native']
    },
    {
      year: 'Now',
      title: 'The Future',
      role: 'Senior Platform Engineer',
      company: 'V7 Labs',
      description: 'Infrastructure for agentic AI. High autonomy, real ownership.',
      type: 'job',
      tags: ['Agentic AI', 'Infrastructure', 'Scale']
    }
  ];

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'startup': return '🚀';
      case 'milestone': return '🎉';
      default: return '💼';
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'startup': return 'from-amber-400 to-orange-500';
      case 'milestone': return 'from-emerald-400 to-teal-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const cardStyles = [
    { border: 'border-purple-100', iconBg: 'bg-purple-50', shadow: 'hover:shadow-purple-500/10' },
    { border: 'border-pink-100', iconBg: 'bg-pink-50', shadow: 'hover:shadow-pink-500/10' },
    { border: 'border-amber-100', iconBg: 'bg-amber-50', shadow: 'hover:shadow-amber-500/10' },
    { border: 'border-emerald-100', iconBg: 'bg-emerald-50', shadow: 'hover:shadow-emerald-500/10' },
    { border: 'border-blue-100', iconBg: 'bg-blue-50', shadow: 'hover:shadow-blue-500/10' },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-900">
      <style jsx global>{`
        @keyframes progress {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-white to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 via-transparent to-amber-50/30"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-[8%] w-96 h-96 bg-purple-300/20 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute bottom-40 right-[5%] w-80 h-80 bg-pink-300/20 rounded-full blur-[70px] animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-amber-200/15 rounded-full blur-[60px] animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              {/* Status badge - Refined */}
              <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 border border-purple-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md animate-fade-in-up">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></span>
                </div>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.15em]">
                  Now Shipping at <span className="text-purple-600">V7 Labs</span>
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="text-slate-800">Hey, I'm </span>
                <br className="sm:hidden" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 animate-gradient bg-size-200">
                  Angelina
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Platform Engineer building the infrastructure behind <span className="text-purple-600 font-bold">agentic AI</span> at <span className="text-slate-900 font-bold">V7 Labs</span>.
                <span className="block mt-3 text-lg text-slate-500">
                  Previously: Legal & General, Anaplan, BNY Mellon
                </span>
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a
                  href="/blog"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                >
                  <span>Read Blog</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">✍️</span>
                </a>
                <a
                  href="/projects"
                  className="px-8 py-4 bg-white text-slate-700 rounded-full font-semibold shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-purple-100 hover:border-purple-200"
                >
                  View Projects →
                </a>
              </div>
              
              {/* Social links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { href: 'https://github.com/angelinaaziz', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/angelina-aziz-8088051a7/', label: 'LinkedIn' },
                  { href: 'https://twitter.com/angelinxaziz', label: 'Twitter' },
                  { href: 'https://www.instagram.com/angelina_codes/', label: 'Instagram' },
                  { href: 'https://www.tiktok.com/@angelina.codes', label: 'TikTok' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-purple-600 transition-all duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Right: Terminal */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                {/* Glow effect - refined */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 rounded-[32px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-[24px] blur-xl"></div>
                
                <div className="relative bg-[#0d1117] rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden border border-white/5">
                  <div className="flex items-center justify-between px-5 py-4 bg-white/[0.03] backdrop-blur-md border-b border-white/5">
                    <div className="flex gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-inner"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500/20 animate-pulse"></div>
                      <span className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">angelina@angelina.dev</span>
                    </div>
                  </div>
                  
                  <div className="p-6 font-mono text-sm min-h-[320px] bg-slate-900">
                    {terminalLines.map((line: any, index: number) => (
                      <div key={index} className={`mb-2.5 ${line.type === 'command' ? 'text-purple-400' : 'text-slate-300'}`}>
                        {line.type === 'command' && <span className="text-pink-500 mr-2">➜</span>}
                        {line.text}
                      </div>
                    ))}
                    
                    {currentLineIndex < terminalContent.length && (
                      <div className={`mb-2.5 ${terminalContent[currentLineIndex].type === 'command' ? 'text-purple-400' : 'text-slate-300'}`}>
                        {terminalContent[currentLineIndex].type === 'command' && <span className="text-pink-500 mr-2">➜</span>}
                        {terminalContent[currentLineIndex].text.substring(0, currentCharIndex)}
                        <span className={`inline-block w-2.5 h-5 bg-purple-500 ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={timelineRef} className="pb-32 pt-12 relative bg-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-purple-100/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-pink-50/40 rounded-full blur-[130px]"></div>
          <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-amber-50/30 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-20 scroll-animate" data-index="-1">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                The Career So Far.
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                Five years of shipping infrastructure, one funded startup, and a lot of YAML.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Main timeline spine - thick and glowing */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-100 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-amber-500 origin-top h-full"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
            
            {timeline.map((item, index) => {
              const isCurrent = item.year === 'Now';
              const style = cardStyles[index % cardStyles.length];
              
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative mb-20 md:mb-32 scroll-animate transition-all duration-1000 ease-out ${
                    visibleItems.has(index)
                      ? 'opacity-100 translate-y-0 scale-100 blur-0'
                      : `opacity-0 translate-y-20 scale-[0.9] blur-md ${index % 2 === 0 ? 'md:-translate-x-16' : 'md:translate-x-16'}`
                  }`}
                  onMouseEnter={() => setActiveTimelineIndex(index)}
                  onMouseLeave={() => setActiveTimelineIndex(null)}
                >
                  <div className={`md:flex md:items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    {/* Card Container */}
                    <div className={`md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div 
                        className={`group relative bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[40px] border-2 transition-all duration-500 shadow-sm ${
                          isCurrent
                            ? 'border-purple-300 shadow-2xl shadow-purple-500/10 ring-4 ring-purple-50'
                            : `${style.border} hover:border-slate-300 ${style.shadow}`
                        } ${activeTimelineIndex === index ? '-translate-y-2 shadow-xl' : 'hover:-translate-y-1'}`}
                      >
                        {/* Connecting Line (desktop only) */}
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-slate-100 ${
                          index % 2 === 0 ? 'left-full' : 'right-full'
                        } transition-colors group-hover:bg-purple-200`}></div>

                        {/* Year Marker - Visual Badge */}
                        <div className={`absolute -top-5 ${index % 2 === 0 ? 'md:-right-6 md:left-auto' : 'md:-left-6' } -left-6`}>
                          <div className={`px-6 py-2 rounded-2xl font-black text-sm tracking-widest shadow-2xl border-4 border-white transform transition-transform group-hover:scale-110 ${
                            isCurrent ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                          }`}>
                            {item.year}
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'items-start'} mb-6`}>
                          <div className={`w-16 h-16 rounded-3xl ${style.iconBg} flex items-center justify-center text-3xl shadow-inner mb-6 border border-white/50 transform transition-transform group-hover:rotate-6`}>
                            {getTimelineIcon(item.type)}
                          </div>
                          
                          <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight">{item.role}</h3>
                          <p className={`font-black mb-4 text-base uppercase tracking-wider ${
                            item.type === 'startup' ? 'text-amber-500' :
                            item.type === 'milestone' ? 'text-emerald-500' :
                            'text-purple-600'
                          }`}>{item.company}</p>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed font-medium mb-8">
                          {item.description}
                        </p>

                        {/* Tech Tags */}
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                          {item.tags?.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-wider border transition-all hover:scale-105 ${
                                isCurrent 
                                  ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                  : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:border-slate-200'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Center Point - Visual Anchor */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center">
                      <div className={`w-4 h-4 rounded-full transition-all duration-700 ${
                        isCurrent 
                          ? 'bg-purple-500 scale-150 ring-[8px] ring-purple-100' 
                          : 'bg-slate-200 ring-[8px] ring-slate-50'
                      } ${activeTimelineIndex === index ? 'scale-150 ring-[12px]' : ''}`}></div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Grander Finish for Timeline */}
            <div className="relative pt-12 md:pt-24 flex flex-col items-center scroll-animate" data-index="90">
              {/* Spine connection */}
              <div className="absolute left-8 md:left-1/2 top-0 h-24 w-[2px] bg-gradient-to-b from-slate-200 to-transparent md:-translate-x-1/2 opacity-50"></div>
              
              <div className="relative z-10 mb-10">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse"></div>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight italic">To be continued...</h3>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Current Chapter: V7 Labs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Section - Bento Grid with Personality */}
      <section className="pb-32 pt-16 relative bg-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-50/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate" data-index="99">
            <span className="px-5 py-2.5 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-6 inline-block shadow-sm">
              ✨ Current Focus
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              What's keeping me busy.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Reading - Large Card */}
            <div className="md:col-span-2 bg-white/70 backdrop-blur-md rounded-[40px] border-2 border-purple-100 p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 scroll-animate" data-index="100">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl shadow-inner border border-purple-100">📚</div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Current Focus: Reading</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">The New Wilderness & The Forty Rules of Love</h3>
                <p className="text-slate-500 font-medium">Minimum 10 pages a day is the rule, but I keep getting hooked and accidentally doing 50-100. Both books were gifts from my best friend - shoutout Asfa.</p>
              </div>
            </div>

            {/* Building - V7 Labs */}
            <div className="bg-white/70 backdrop-blur-md rounded-[40px] border-2 border-slate-100 p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-500 hover:-translate-y-2 scroll-animate" data-index="101">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl border border-slate-100 shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">⚡</div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Day Job</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Platform @ V7 Labs</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Building the infrastructure behind agentic AI. Sub-100 person startup, real impact, vision I believe in.</p>
              </div>
            </div>

            {/* Side Quest - Auralyze */}
            <div className="bg-white/70 backdrop-blur-md rounded-[40px] border-2 border-emerald-100 p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 scroll-animate" data-index="102">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100 shadow-inner transition-transform group-hover:rotate-12">🧠</div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Side Quest</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Auralyze.ai</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Techstars-backed AI interview prep. One job wasn't enough chaos, apparently.</p>
              </div>
            </div>

            {/* Learning - Large Card */}
            <div className="md:col-span-2 bg-white/70 backdrop-blur-md rounded-[40px] border-2 border-pink-100 p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-2 scroll-animate" data-index="103">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-3xl border border-pink-100 shadow-inner group-hover:animate-bounce">🎯</div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">Actually Doing The Things</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-end">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Chess, Urdu & Archery</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">No more "I'll do it someday." Lessons are booked. As a programmer, being this bad at chess is genuinely embarrassing.</p>
                </div>
                <div className="relative p-6 rounded-3xl bg-pink-50/50 border border-pink-100 flex flex-col gap-3 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-4xl text-pink-500">اردو</div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Urdu Progress</span>
                    <span className="text-xs font-black text-pink-600 font-mono">Loading...</span>
                  </div>
                  <div className="h-3 bg-white rounded-full p-0.5 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '15%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-sm relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                    </motion.div>
                  </div>
                  <p className="text-[10px] text-pink-400 font-bold">Goal: Read my grandad's book of Iqbal poems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-24 relative bg-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate" data-index="200">
          <a
            href="mailto:angelinaaziz1@gmail.com"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            <span>☕</span>
            <span>Let's chat</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gradient-to-b from-white to-purple-50/50 relative overflow-hidden border-t border-purple-100">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-6">
                angelina.dev
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Platform engineer by day, startup founder by whenever-I-can, powered entirely by caffeine and deadlines.
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-800 font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { href: '/blog', label: 'Blog' },
                  { href: '/projects', label: 'Projects' },
                  { href: '/resume', label: 'Resume' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-slate-500 hover:text-purple-600 transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-slate-800 font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: 'https://github.com/angelinaaziz', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/angelina-aziz-8088051a7/', label: 'LinkedIn' },
                  { href: 'https://twitter.com/angelinxaziz', label: 'Twitter' },
                  { href: 'https://www.instagram.com/angelina_codes/', label: 'Instagram' },
                  { href: 'https://www.tiktok.com/@angelina.codes', label: 'TikTok' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-2xl bg-white text-slate-500 hover:bg-purple-100 hover:text-purple-600 transition-all text-xs font-bold border border-purple-100 shadow-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mb-10 opacity-30"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-medium">
              © 2025 Angelina Aziz. Built with Next.js & too much caffeine.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Currently in London
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
