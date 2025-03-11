"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play } from "lucide-react"
import styles from "./movie-trailer-modal.module.css"

interface MovieTrailerModalProps {
   trailerKey: string
  title?: string
}

export default function MovieTrailerModal({ trailerKey, title }: MovieTrailerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
   if(trailerKey == null || trailerKey === "" || trailerKey === undefined) {
      setDisabled(true)
   }
  }, [trailerKey])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, setIsOpen])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
         setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, setIsOpen])

  if (!isMounted) return null

  if (!isOpen) {
   return (
      <div className={styles.actions}>
         <button disabled={disabled} className={styles.watchButton} style={disabled ? {opacity: .5, cursor: 'default'} : undefined} onClick={() => setIsOpen(true)}>
            <Play className={styles.playIcon} />
            Watch Trailer
         </button>
         <button className={styles.addButton}>+ Add to Watchlist</button>
      </div>
   )
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} ref={modalRef}>
        <div className={styles.modalHeader}>
          {title && <h3 className={styles.modalTitle}>{title}</h3>}
          <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.trailerIframe}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

