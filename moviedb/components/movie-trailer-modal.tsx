"use client";

import { useState, useEffect, useRef } from "react";
import { X, Play } from "lucide-react";
import styles from "./movie-trailer-modal.module.css";
import movieAPI from "@/lib/api/movies";
import { useToast } from "@/context/toastContext";
interface MovieTrailerModalProps {
  trailerKey?: string;
  isVideo?: boolean;
  title?: string;
  movieId?: number;
}

export default function MovieTrailerModal({ trailerKey, title, movieId, isVideo }: MovieTrailerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const {createToast} = useToast();

  useEffect(() => {
    setIsMounted(true);

    const checkWatchlist = async () => {
      const sessionId = localStorage.getItem("moviedb_session_id");
      const user = localStorage.getItem("moviedb_user") ? JSON.parse(localStorage.getItem("moviedb_user")!) : null;
      if (sessionId && user && movieId) {
        const isInList = await isMovieInWatchlist(user.id, sessionId, movieId);
        setIsInWatchlist(isInList);
      }
    };

    checkWatchlist();
  }, [movieId]);
  useEffect(() => {
    if (!trailerKey) {
      setDisabled(true);
    }
  }, [trailerKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  const isMovieInWatchlist = async (accountId: number, sessionId: string, movieId: number): Promise<boolean> => {
    try {
      const watchlistResponse = await movieAPI.getWatchlist(accountId, sessionId, 1);
      return watchlistResponse?.results?.some((movie: { id: number }) => movie.id === movieId) || false;
    } catch (error) {
      console.error("Error checking watchlist:", error);
      return false;
    }
  };

  const handleWatchlist = async () => {
    try {
      const sessionId = localStorage.getItem("moviedb_session_id");
      const user = localStorage.getItem("moviedb_user") ? JSON.parse(localStorage.getItem("moviedb_user")!) : null;
      
      if (!sessionId || !user ) {
        createToast("You must be logged in to add to watchlist.", "error");
        return;
      }

      if (!sessionId || !user || movieId === undefined) {
        createToast("You must be logged in to add to watchlist.", "error");
        console.error("User not authenticated, session ID missing, or movieId is undefined.");
        return;
      }
      
  
      const newWatchlistState = !isInWatchlist;
      const response = await movieAPI.addRemoveWatchlist(user.id, sessionId, movieId, newWatchlistState);
  
      console.log("Watchlist API Response:", response); // Debugging response
  
      if (response && (response.status_code === 1 || response.status_code === 12 || response.status_code === 13)) {
        setIsInWatchlist(newWatchlistState);
      } else {
        alert("Failed to update watchlist.");
      }
    } catch (error) {
      console.error("Failed to update watchlist:", error);
    }
  };
  

  if (!isMounted) return null;

  if (!isOpen) {
    return (
      <div className={styles.actions}>
        {isVideo && <button
          disabled={disabled}
          className={styles.watchButton}
          style={disabled ? { opacity: 0.5, cursor: "default" } : undefined}
          onClick={() => setIsOpen(true)}
        >
          <Play className={styles.playIcon} />
          Watch Trailer
        </button>}
        <button onClick={handleWatchlist} className={styles.addButton}>
          {isInWatchlist ? "Remove from Watchlist" : "+ Add to Watchlist"}
        </button>
      </div>
    );
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
  );
}
