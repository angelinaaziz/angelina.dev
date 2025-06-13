import { FaStar, FaHeart, FaChevronLeft, FaChevronRight, FaGithub, FaLock, FaLockOpen } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import ProjectImageCarousel from '@/components/ProjectImageCarousel';

export default function Projects() {
  const projects = [
    {
      title: "Auralyze.ai",
      description: "An advanced interview preparation platform with 3000+ users that leverages multiple AI models to provide comprehensive feedback on interview performance. Now focused on the general job market, helping professionals across industries improve their interview skills.",
      tech: ["React", "Node.js", "MongoDB", "OpenAI APIs", "Computer Vision", "MediaPipe", "MaterialUI", "Cloudinary"],
      link: "https://www.auralyze.ai",
      codeStatus: "Private Repository",
      emoji: "🎤",
      status: "Live - Revenue Generating",
      images: [
        "/images/auralyze/Screenshot 2025-04-04 at 19.21.38.png",
        "/images/auralyze/Screenshot 2025-04-04 at 19.22.45.png"
      ],
      achievements: [
        "Techstars Portfolio company that raised $120,000",
        "Single-handedly managed all aspects from UI design to deployment",
        "Implemented multiple AI models including GPT-4, computer vision, and MediaPipe for comprehensive interview analysis",
        "Expanded from medical field focus to serving the broader job market"
      ]
    },
    {
      title: "Becoming: Your Journey, Your NFT",
      description: "A decentralised application that transforms personal growth into a visual journey through soul-bound NFTs that evolve as you achieve milestones. Becoming NFTs are non-transferable, visually evolve, and create a permanent, verifiable record of your achievements. Built with React, TailwindCSS, Framer Motion, and ink! smart contracts on Polkadot.",
      tech: ["React", "TailwindCSS", "Framer Motion", "ink!", "Rust", "Polkadot"],
      link: "https://github.com/angelinaaziz/becoming",
      codeStatus: "Open Source",
      emoji: "🦋",
      status: "Live Demo Available",
      images: [
        "/images/becoming/journey-page.png"
      ],
      achievements: [
        "Soul-bound NFT avatars that visually evolve as you add milestones",
        "Immutable, verifiable achievement records on Polkadot",
        "Community recognition and tipping system",
        "Featured demo and technical walkthrough videos"
      ]
    },
    {
      title: "When Is Payday?",
      description: "A modern web application that helps users track and manage their paydays with precise scheduling and calendar integration. Currently awaiting Google Calendar API approval for full launch.",
      tech: ["Next.js", "TypeScript", "Calendar API", "Tailwind CSS"],
      link: "https://www.whenispayday.com",
      codeStatus: "Private Repository",
      emoji: "💸",
      images: [
        "/images/payday/Screenshot 2025-04-04 at 19.25.54.png"
      ],
      status: "In Development - Awaiting API Approval"
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-4 text-center">
          My Projects
          <span className="inline-block ml-4 text-4xl animate-bounce-subtle">✨</span>
        </h1>
        <p className="text-xl text-slate-700 mb-10 text-center max-w-3xl mx-auto">
          I just like building cool stuff that actually helps people. Here's some of the things I've made that I'm pretty proud of!
        </p>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-soft hover:shadow-purple transition-all duration-500 border border-purple-100 overflow-hidden group"
            >
              <div className="p-6 sm:p-8 relative">
                <span className="absolute top-4 right-4 text-4xl animate-bounce-subtle z-10">
                  {project.emoji}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-accent-pink mb-4">
                  {project.title}
                </h3>
                
                {project.status && (
                  <div className="mb-4">
                    <span className={`px-4 py-1.5 ${
                      project.status.includes("Live") 
                        ? "bg-green-100 text-green-700" 
                        : "bg-purple-100 text-purple-600"
                    } rounded-full text-sm font-medium inline-block`}>
                      {project.status}
                    </span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  {/* Screenshot Carousel Section */}
                  <div>
                    {project.images && project.images.length > 0 && (
                      <ProjectImageCarousel 
                        images={project.images} 
                        title={project.title} 
                      />
                    )}
                  </div>
                  
                  {/* Project Description Section */}
                  <div>
                    <p className="text-slate-700 mb-6 text-lg">
                      {project.description}
                    </p>
                    
                    {project.achievements && (
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-purple-500 mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {project.achievements.map((achievement, i) => (
                            <li key={i} className="group-hover:translate-x-1 transition-transform duration-300">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-full font-medium hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-5 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-300 hover:-translate-y-1 shadow-purple text-sm tracking-wider"
                      >
                        Visit Project <span className="ml-2">→</span>
                      </a>
                      
                      {project.codeStatus && (
                        <div
                          className="inline-flex items-center justify-center px-4 py-2 bg-white text-slate-600 rounded-full font-medium border border-slate-200 text-sm tracking-wider"
                        >
                          {project.codeStatus === 'Open Source' ? (
                            <FaLockOpen className="mr-2 text-green-500" />
                          ) : (
                            <FaLock className="mr-2 text-slate-500" />
                          )}
                          {project.codeStatus}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-4 group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 