import Image from "next/image";
import { FaHeart, FaStar, FaCloud, FaGithub, FaInstagram, FaTiktok, FaShieldAlt, FaCode, FaRocket, FaServer, FaCog } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-waves bg-bottom bg-no-repeat opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-dots bg-dots"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent"></div>
        
        {/* Decorative elements - more subtle animations */}
        <div className="absolute top-32 left-1/4 text-purple-300 animate-float opacity-40">
          <FaCloud size={40} />
        </div>
        <div className="absolute top-40 right-1/4 text-accent-pink animate-bounce-subtle opacity-30">
          <FaStar size={30} />
        </div>
        <div className="absolute bottom-1/4 left-1/5 text-accent-lavender animate-pulse-subtle opacity-30">
          <FaHeart size={24} />
        </div>
        <div className="absolute top-1/2 right-1/5 text-purple-400 animate-spin-slow opacity-20">
          <FaCog size={50} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-accent-peach animate-float opacity-30" style={{ animationDelay: "1.5s" }}>
          <FaRocket size={24} />
        </div>
        
        {/* Floating shapes - more subtle */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/5 to-pink-400/5 animate-morph"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-tr from-accent-peach/5 to-accent-lavender/5 animate-morph" style={{ animationDelay: "2s" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="mb-8 inline-block opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "200ms" }}>
              <div className="px-6 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium transform hover:scale-105 transition-all duration-300">
                Senior DevOps Engineer
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tight text-slate-800 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "400ms" }}>
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200 relative">
                Angelina
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-700 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "600ms" }}>
              Specialising in cloud infrastructure management and developer enablement with expertise in AWS, Azure, and modern DevOps practices
            </p>
            
            <div className="flex flex-wrap justify-center gap-5 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "800ms" }}>
              <a
                href="/projects"
                className="px-10 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-300 shadow-purple hover:-translate-y-2 hover:shadow-glow text-sm uppercase tracking-wider group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:mr-1 transition-all duration-300">View My Work</span>
                <span className="relative z-10 inline-block group-hover:translate-x-1 transition-transform duration-300">✨</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a
                href="/resume"
                className="px-10 py-4 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all duration-300 shadow-soft hover:-translate-y-2 hover:shadow-purple border border-purple-200 text-sm uppercase tracking-wider group"
              >
                <span className="group-hover:mr-1 transition-all duration-300">Download Resume</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">📄</span>
              </a>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center space-x-4 sm:space-x-6 opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "1000ms" }}>
              {[
                { href: 'https://www.linkedin.com/in/angelina-aziz-8088051a7/', label: 'LinkedIn', icon: '🔗' },
                { href: 'https://twitter.com/angelinxaziz', label: 'Twitter', icon: '🐦' },
                { href: 'https://github.com/angelinaaziz', label: 'GitHub', icon: '💻' },
                { href: 'https://www.instagram.com/angelina_codes/', label: 'Instagram', icon: '📸' },
                { href: 'https://www.tiktok.com/@angelina.codes', label: 'TikTok', icon: '📱' },
                { href: 'https://angelinaaziz.substack.com', label: 'Blog', icon: '✍️' }
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 hover:text-purple-600 transition-all duration-300 hover:-translate-y-1 group mb-2"
                >
                  <span className="inline-block mr-2 group-hover:animate-bounce-subtle">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 text-center opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "200ms" }}>
            What I Do
            <span className="inline-block ml-4 text-4xl animate-bounce-subtle">🚀</span>
          </h2>
          
          <p className="text-xl text-slate-700 mb-8 text-center max-w-3xl mx-auto opacity-0 animate-fade-in transition-opacity duration-700" style={{ animationFillMode: 'forwards', animationDelay: "400ms" }}>
            Building and optimising cloud infrastructure to improve developer productivity and business capabilities
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Cloud Infrastructure",
                description: "Managing and optimising AWS and Azure resources for scalability, cost-efficiency, and performance.",
                icon: <FaCloud className="text-accent-lavender" size={30} />,
                delay: 600
              },
              {
                title: "DevOps Practices",
                description: "Implementing CI/CD pipelines, infrastructure as code, and deployment automation to accelerate delivery.",
                icon: <FaRocket className="text-accent-pink" size={30} />,
                delay: 700
              },
              {
                title: "Developer Enablement",
                description: "Creating tools and platforms that empower development teams to build, test, and deploy with confidence.",
                icon: <FaCode className="text-purple-500" size={30} />,
                delay: 800
              },
              {
                title: "Security Management",
                description: "Implementing infrastructure security controls, managing vulnerabilities, and ensuring compliance with best practices.",
                icon: <FaShieldAlt className="text-accent-peach" size={30} />,
                delay: 900
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-3xl shadow-soft hover:shadow-purple transition-all duration-300 hover:-translate-y-2 border border-purple-100 group cursor-pointer relative opacity-0 animate-fade-in transition-opacity duration-700"
                style={{ animationFillMode: 'forwards', animationDelay: `${item.delay}ms` }}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-300">
                  <FaHeart className="animate-pulse-subtle" />
                </div>
                
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 animate-float">{item.icon}</div>
                <h3 className="text-lg font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm">{item.description}</p>
                
                <div className="h-1.5 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-4 group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
