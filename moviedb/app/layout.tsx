import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { AuthProvider } from "@/context/authContext"
import { ToastProvider } from "@/context/toastContext"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "MovieDB Info - Find and Discover Movies",
    template: "%s | MovieDB Info",
  },
  description: "Browse and discover movies, add to your watchlist and more",
  openGraph: {
    title: "MovieDB Info",
    siteName: "MovieDB Info",
    type: "website",
    url: "https://moviedb-info.vercel.app/",
    images: [
      {
        url: "https://moviedb-info.vercel.app/_next/static/media/logo.3ec7b58d.webp",
        alt: "MovieDB Info Logo",
      },
    ],
    description: "Explore trending, top-rated, and upcoming movies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

