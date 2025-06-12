import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Angelina Aziz - Platform Engineer & Builder",
    template: "%s | Angelina Aziz"
  },
  description: "Platform Engineer & Builder passionate about creating scalable solutions, developer tools, and cloud architecture. Building platforms that empower teams to ship faster and more reliably.",
  keywords: [
    "Platform Engineer",
    "DevOps Engineer", 
    "Cloud Architecture",
    "Full-Stack Developer",
    "AWS",
    "Azure",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Infrastructure as Code",
    "Developer Tools",
    "Software Engineering",
    "Tech Blog",
    "Angelina Aziz"
  ],
  authors: [{ name: "Angelina Aziz", url: "https://angelina.dev" }],
  creator: "Angelina Aziz",
  publisher: "Angelina Aziz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://angelina.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://angelina.dev",
    title: "Angelina Aziz - Platform Engineer & Builder",
    description: "Platform Engineer & Builder passionate about creating scalable solutions, developer tools, and cloud architecture. Building platforms that empower teams to ship faster and more reliably.",
    siteName: "Angelina Aziz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Angelina Aziz - Platform Engineer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angelina Aziz - Platform Engineer & Builder",
    description: "Platform Engineer & Builder passionate about creating scalable solutions, developer tools, and cloud architecture.",
    creator: "@angelinxaziz",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
