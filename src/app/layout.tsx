import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat" 
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta"
});

export const metadata: Metadata = {
  title: "Angelina | DevOps Engineer",
  description: "Personal portfolio of Angelina, a Senior DevOps Engineer",
};

const socialLinks = [
  { href: 'https://www.linkedin.com/in/angelina-aziz-8088051a7/', label: 'LinkedIn', external: true },
  { href: 'https://twitter.com/angelinxaziz', label: 'Twitter', external: true },
  { href: 'https://angelinaaziz.substack.com', label: 'Blog', external: true },
];

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-light antialiased font-sans">
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <a 
                  href="/" 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-purple-500 hover:opacity-80 transition-opacity"
                >
                  angelina.dev
                </a>
              </div>
              <div className="flex items-center">
                <div className="hidden md:flex space-x-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 mx-1 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 mx-1 rounded-full text-purple-700 hover:text-purple-800 hover:bg-purple-50 transition-all duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
