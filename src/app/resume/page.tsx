import { FaStar } from 'react-icons/fa';

export default function Resume() {
  return (
    <div className="min-h-screen py-32 bg-white">
      <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl shadow-soft border border-purple-100 p-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Angelina Aziz</h1>
            <p className="text-2xl text-purple-600 mb-6">Senior DevOps Engineer</p>
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
                A Senior DevOps Engineer with over 4 years of experience specialising in infrastructure management
                and platform engineering. Proven expertise in cloud computing (AWS and Azure), containerisation, and 
                continuous integration/delivery. Focused on improving developer productivity and enabling teams to 
                deliver technical solutions that drive business value.
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
                    Senior DevOps Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Multiverse • 02/2025 - Present</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Lead on key infrastructure projects supporting Multiverse's AI, data, and software engineering apprenticeship platforms.</li>
                    <li>Architect and implement cloud solutions on AWS and Azure to power personalised learning experiences for professional apprenticeships.</li>
                    <li>Drive DevOps best practices to enhance developer productivity and collaboration across engineering teams.</li>
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
                    <li>Led systems design and architectural decisions for critical financial services infrastructure.</li>
                    <li>Maintained business-critical platform services for one of the largest investment management divisions in LGRI.</li>
                    <li>Implemented infrastructure as code practices to standardise deployment processes and reduce manual configurations.</li>
                    <li>Collaborated with development teams to improve CI/CD pipelines and deployment automation.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Platform Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Anaplan • 10/2021 - 09/2023</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Developed and maintained CI/CD pipelines using Jenkins for Anaplan's connected planning software platform.</li>
                    <li>Migrated data and services from on-premises data centres to cloud environments in AWS and GCP, ensuring data integrity and reducing operational costs.</li>
                    <li>Implemented containerisation strategies using Docker and Kubernetes to enable zero-downtime deployments of planning and forecasting applications.</li>
                    <li>Enhanced system monitoring and observability using Splunk and custom metrics to improve reliability of business planning tools.</li>
                    <li>Contributed to platform architecture decisions to support Anaplan's financial planning, sales forecasting, and supply chain management solutions.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>

                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Apprentice Software Engineer
                  </h3>
                  <p className="text-slate-500 mb-4">Bank of New York Mellon • 02/2020 - 10/2021</p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Developed automated testing frameworks using Selenium, Cucumber, and Jenkins for asset servicing technology platforms.</li>
                    <li>Supported deployment of financial services applications across multiple global regions, gaining experience in complex deployment processes.</li>
                    <li>Implemented logging and monitoring solutions using Splunk and Kibana to increase visibility into production environments.</li>
                    <li>Collaborated with international teams to ensure reliable operation of critical banking infrastructure systems.</li>
                  </ul>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 inline-flex items-center">
                Skills
                <FaStar className="ml-2 text-accent-pink text-sm animate-pulse-subtle" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Rust", "Kubernetes", "Docker", "Typescript", "AWS", "Azure", "Jenkins", "Terraform", "Git", "MongoDB", "Splunk", "Grafana", "CI/CD", "IaC"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-300 group-hover:animate-pulse-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <h3 className="font-bold text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Effective Communication", "Teamwork", "Problem-Solving", "Critical Thinking", "Adaptability", "Time Management", "Technical Leadership"].map((skill, index) => (
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
                  <p className="text-slate-500 mb-1">Loughborough University (Currently on hold) • Started 10/2022</p>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-3 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div className="group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    Level 4 Software Development
                  </h3>
                  <p className="text-slate-500 mb-1">BCS&QA • 2020 - 2021</p>
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
    </div>
  )
} 