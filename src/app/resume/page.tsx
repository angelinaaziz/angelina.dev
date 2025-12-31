import { FaStar } from 'react-icons/fa';

export default function Resume() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-white"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                👩‍💻 Professional Profile
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight text-slate-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200">
                Angelina Aziz
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-purple-600 mb-6 font-medium">Senior Platform Engineer</p>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <main className="relative pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-3xl shadow-soft border border-purple-100 p-8 sm:p-10">
            <div className="text-center mb-12">
            <div className="flex justify-center space-x-6 text-slate-800">
              <a href="mailto:angelinaaziz1@gmail.com" className="hover:text-purple-600 transition-colors hover:-translate-y-1 transition-transform duration-300 inline-flex">
                <span className="mr-2">📧</span> Email
              </a>
              <a href="https://www.linkedin.com/in/angelina-aziz-8088051a7/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors hover:-translate-y-1 transition-transform duration-300 inline-flex">
                <span className="mr-2">🔗</span> LinkedIn
              </a>
              <a href="https://twitter.com/angelinxaziz" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors hover:-translate-y-1 transition-transform duration-300 inline-flex">
                <span className="mr-2">🐦</span> Twitter
              </a>
              <a href="tel:07595470805" className="hover:text-purple-600 transition-colors hover:-translate-y-1 transition-transform duration-300 inline-flex">
                <span className="mr-2">📱</span> 07595470805
              </a>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Professional Summary
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <p className="text-slate-700 text-lg">
                A Senior Platform Engineer with over 5 years of experience specialising in cloud infrastructure, 
                platform engineering, and DevOps. Proven expertise in AWS, Azure, GCP, Kubernetes, and Terraform. 
                Focused on improving developer productivity, enabling teams to deliver technical solutions that 
                drive business value, and building reliable, scalable infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Experience
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <div className="space-y-8">
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Senior Platform Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">V7 Labs • 12/2025 - Present</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Supported and operated cross-cloud infrastructure across AWS, Azure, and GCP, ensuring reliable deployment and consistent environments.</li>
                    <li>Designed and developed CI/CD pipelines to automate build, test, and deployment workflows to improve developer productivity.</li>
                    <li>Drove enterprise customer acquisition by supporting SOC 2, ISO 27001, and HIPAA compliance.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Senior DevOps Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Multiverse • 02/2025 - 09/2025</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Lead on key infrastructure projects supporting Multiverse's AI, data, and software engineering apprenticeship platforms.</li>
                    <li>Architect and implement cloud solutions on AWS and Azure to power personalised learning experiences for professional apprenticeships.</li>
                    <li>Design and maintain infrastructure as code using Terraform to support scalable deployment of learning platforms.</li>
                    <li>Implement monitoring and observability solutions to ensure high availability of business-critical systems.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Senior Platform Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Legal & General • 10/2023 - 01/2025</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Automated infrastructure provisioning using Terraform, reducing manual overhead and deployment inconsistencies.</li>
                    <li>Implemented observability solutions (Prometheus, Splunk) to enhance system monitoring and alerting.</li>
                    <li>Maintained critical cloud infrastructure (AWS, Kubernetes), ensuring high availability and fault tolerance.</li>
                    <li>Led incident response efforts, performing root cause analysis and implementing fixes to improve system resilience.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Platform Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Anaplan • 10/2021 - 09/2023</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Developed and maintained a sophisticated CI/CD pipeline using Jenkins, accelerating project deployment and increasing code base stability.</li>
                    <li>Migrated existing data from company-owned DCs to cloud spokes in AWS and GCP, ensuring data integrity and accessibility, and reducing operational costs.</li>
                    <li>Configured, deployed, and managed containerised applications on demand, achieving zero downtime during core software upgrades.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>

                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Apprentice Software Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Bank of New York Mellon • 02/2020 - 10/2021</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Delivered production-ready software via automated testing, cloud deployments, and improved production observability.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Projects
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                  Auralyze.ai
                </h3>
                <p className="text-slate-500 mb-2">Instant university interview feedback using AI</p>
                <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                  <li>Co-founded and grew a university admissions co-pilot platform to help students get into medical and dental school.</li>
                  <li>Raised $120,000 in funding from Techstars Atlanta.</li>
                  <li>Learnt about institutional VC and how to manage a start-up from dev and deployment to customer acquisition and fundraising.</li>
                </ul>
                <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Skills
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Cloud & Infrastructure</h3>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Platform & DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {["CI/CD", "GitHub Actions", "IaC", "Cloud Migrations", "Incident Response"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Observability & Reliability</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Prometheus", "Grafana", "Splunk", "Logging", "Monitoring", "Alerting"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Rust", "TypeScript"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Education
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <div className="space-y-6">
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    MSc Systems Engineering
                  </h3>
                  <p className="text-slate-500 mb-1">Loughborough University (Part-time)</p>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-3 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Level 4 Software Development
                  </h3>
                  <p className="text-slate-500 mb-1">BCS & QA • 2020 - 2021</p>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-3 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    A-Levels & GCSEs
                  </h3>
                  <p className="text-slate-700 mb-1">A-Levels in Computer Science, Mathematics, Physics, and Critical Thinking - B, B, B, B</p>
                  <p className="text-slate-700">GCSEs (11 A*-As)</p>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-3 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
            <a
              href="/angelina-aziz.pdf"
              download="angelina-aziz.pdf"
              className="inline-flex items-center px-10 py-4 border border-transparent text-sm uppercase tracking-wider font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-purple hover:-translate-y-1 group"
            >
              <span className="group-hover:mr-1 transition-all duration-300">Download Full Resume</span>
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">📄</span>
            </a>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}
