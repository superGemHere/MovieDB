"use client"

import { useState, useRef, useEffect } from "react"
import MovieCard from "./movie-card"
import styles from "./movie-slider.module.css"
import type { Movie } from "@/types/movie"


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

