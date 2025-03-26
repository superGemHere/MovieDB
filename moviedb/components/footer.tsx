import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.column}>
            <h3>MovieDB</h3>
            <p>Your ultimate movie database for discovering and exploring films from around the world.</p>
            <div className={styles.social}>
              <Link href="#" className={styles.socialIcon} aria-label="Facebook Link">
                <Facebook size={20} aria-label="Facebook Button"/>
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Twitter Link">
                <Twitter size={20} aria-label="Twitter Button"/>
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Instagram Link">
                <Instagram size={20} aria-label="Instagram Button"/>
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Youtube Link">
                <Youtube size={20} aria-label="Youtube Button"/>
              </Link>
              <Link href="https://github.com/superGemHere/MovieDB/tree/main/moviedb" className={styles.socialIcon}  aria-label="Github Link">
                <Github size={20} aria-label="Github Button"/>
              </Link>
            </div>
            <div className={styles.attribution}>
              <span >This project is made for portfolio and uses data provided by</span>
              <Link target="_blank" href="https://www.themoviedb.org/">TMDB</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Categories</h4>
            <Link href="/category/action">Action</Link>
            <Link href="/category/comedy">Comedy</Link>
            <Link href="/category/drama">Drama</Link>
            <Link href="/category/sci-fi">Sci-Fi</Link>
            <Link href="/category/horror">Horror</Link>
          </div>

          <div className={styles.column}>
            <h4>Quick Links</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} MovieDB Info. All rights reserved by superGemHere.</p>
        </div>
      </div>
    </footer>
  )
}

