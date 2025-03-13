"use client"

import { useState, useRef, useEffect } from "react"
import MovieCard from "./movie-card"
import styles from "./movie-slider.module.css"
import type { Movie } from "@/types/movie"

// Sample movie data
// const movies: Movie[] = [
//   {
//     id: 1,
//     title: "Inception",
//     year: 2010,
//     rating: 8.8,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Sci-Fi",
//   },
//   {
//     id: 2,
//     title: "The Dark Knight",
//     year: 2008,
//     rating: 9.0,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Action",
//   },
//   {
//     id: 3,
//     title: "Interstellar",
//     year: 2014,
//     rating: 8.6,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Adventure",
//   },
//   {
//     id: 4,
//     title: "Pulp Fiction",
//     year: 1994,
//     rating: 8.9,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Crime",
//   },
//   {
//     id: 5,
//     title: "The Shawshank Redemption",
//     year: 1994,
//     rating: 9.3,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Drama",
//   },
//   {
//     id: 6,
//     title: "The Godfather",
//     year: 1972,
//     rating: 9.2,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Crime",
//   },
//   {
//     id: 7,
//     title: "Fight Club",
//     year: 1999,
//     rating: 8.8,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Drama",
//   },
//   {
//     id: 8,
//     title: "Forrest Gump",
//     year: 1994,
//     rating: 8.8,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Drama",
//   },
//   {
//     id: 9,
//     title: "The Matrix",
//     year: 1999,
//     rating: 8.7,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Sci-Fi",
//   },
//   {
//     id: 10,
//     title: "Goodfellas",
//     year: 1990,
//     rating: 8.7,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Crime",
//   },
//   {
//     id: 11,
//     title: "The Silence of the Lambs",
//     year: 1991,
//     rating: 8.6,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Thriller",
//   },
//   {
//     id: 12,
//     title: "The Lord of the Rings",
//     year: 2001,
//     rating: 8.8,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Fantasy",
//   },
//   {
//     id: 13,
//     title: "Star Wars",
//     year: 1977,
//     rating: 8.6,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Sci-Fi",
//   },
//   {
//     id: 14,
//     title: "Titanic",
//     year: 1997,
//     rating: 7.9,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Romance",
//   },
//   {
//     id: 15,
//     title: "Jurassic Park",
//     year: 1993,
//     rating: 8.2,
//     poster: "/placeholder.svg?height=450&width=300",
//     genre: "Adventure",
//   },
// ]

type MovieSliderProps = {
   sectionTitle?: string
   movies: Movie[]
   slice?: number
}

export default function MovieSlider({
   sectionTitle,
   movies,
   slice = 10,
}: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(5)
  const sliderRef = useRef<HTMLDivElement>(null);
  const slicedMovies = movies.slice(0, slice)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 900) {
        setItemsPerSlide(3)
      } else if (window.innerWidth < 1200) {
        setItemsPerSlide(4)
      } else {
        setItemsPerSlide(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - itemsPerSlide
      return newIndex < 0 ? 0 : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + itemsPerSlide
      const maxIndex = slicedMovies.length - itemsPerSlide
      return newIndex > maxIndex ? maxIndex : newIndex
    })
  }

  const translateValue = `-${currentIndex * (100 / itemsPerSlide)}%`

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.sliderTitle}>{null}</h2>
        <div className={styles.sliderControls}>
          <button
            className={styles.sliderButton}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous movies"
          >
            &#10094;
          </button>
          <button
            className={styles.sliderButton}
            onClick={handleNext}
            disabled={currentIndex >= slicedMovies.length - itemsPerSlide}
            aria-label="Next movies"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div
          ref={sliderRef}
          className={styles.slider}
          style={{
            transform: `translateX(${translateValue})`,
            gridTemplateColumns: `repeat(${movies.length}, calc(${100 / itemsPerSlide}%))`,
          }}
        >
          {slicedMovies.map((movie) => (
            <div key={movie.id} className={styles.sliderItem}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

