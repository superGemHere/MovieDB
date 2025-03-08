import Image from "next/image"
import Link from "next/link"
import { Star, Clock } from "lucide-react"
import styles from "./movie-card.module.css"
import type { Movie } from "@/types/movie"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.poster}>
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}` || "/placeholder.svg"}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 140px, 180px"
          className={styles.image}
        />
        <div className={styles.rating}>
          <Star className={styles.starIcon} size={12} />
          <span>{movie.vote_average}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.release_date}</span>
          <div className={styles.runtime}>
            <Clock size={12} />
            <span>{movie.runtime} min</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

