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
  title: "MovieDB Info - Find and Discover Movies",
  description: "Browse and discover movies, add to your watchlist and more",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>MovieDB Info</title>
        <meta property="og:title" content="MovieDB Info" />
        <meta property="og:site_name" content="MovieDB Info" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moviedb-info.vercel.app/" />
        <meta property="og:image" content="https://moviedb-info.vercel.app/_next/static/media/logo.3ec7b58d.webp" />
        <meta property="og:image:alt" content="MovieDB Info Logo" />
        <meta property="og:description" content="Explore trending, top-rated, and upcoming movies." />
      </Head>
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

