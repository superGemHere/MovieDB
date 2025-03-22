"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, User, Film, Home, TrendingUp, Star } from "lucide-react"
import styles from "./header.module.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Film className={styles.logoIcon} />
          <span className={styles.logoText}>MovieDB Info</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <Link href="/" className={styles.navLink}>
            <Home className={styles.navIcon} />
            <span>Home</span>
          </Link>
          <Link href="/category/trending" className={styles.navLink}>
            <TrendingUp className={styles.navIcon} />
            <span>Trending</span>
          </Link>
          <Link href="/category/top-rated" className={styles.navLink}>
            <Star className={styles.navIcon} />
            <span>Top Rated</span>
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/search" className={styles.iconButton}>
            <Search />
          </Link>
          <Link href="/profile" className={styles.iconButton}>
            <User />
          </Link>
          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}

