"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn, Film, Star, Clapperboard, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import { useAuth } from "@/context/authContext";
import { tmdbAuth } from "@/lib/api/auth";
import movieAPI from "@/lib/api/movies";
import { Movie } from "@/types/movie";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const {
    createRequestToken,
    isAuthenticated,
    isLoading: authLoading,
    setIsAuthenticated,
    error: authError
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await movieAPI.getTrendingMovies();
        if ('results' in response) {
          setMovies(response.results);
        } else {
          setErrorMessage("Unexpected response format. Please try again later.");
        }
      } catch (err) {
        setErrorMessage(
          "Failed to fetch popular movies. Please try again later."
        );
      }
    };

    fetchPopularMovies();
  }, []);

  const handleTMDBLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const requestToken = await createRequestToken();
      const authUrl = tmdbAuth.getAuthenticationUrl(requestToken);
      window.location.href = authUrl;
      setIsAuthenticated(true);
    } catch (err) {
      setErrorMessage(
        "Failed to initialize TMDB authentication. Please try again."
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
    }
  }, [authError]);

  if (authLoading) {
    return (
      <main className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>Loading authentication...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.loginWrapper}>
        <div className={styles.leftPanel}>
          <div className={styles.contentWrapper}>
            <div className={styles.logoContainer}>
              <Film className={styles.logoIcon} />
              <h1 className={styles.logoText}>MovieDB</h1>
            </div>

            <h2 className={styles.welcomeTitle}>Welcome to MovieDB</h2>
            <p className={styles.welcomeText}>
              Your ultimate destination for discovering and tracking movies from
              around the world. Sign in with your TMDB account to access
              personalized recommendations, create watchlists, and more.
            </p>

            {errorMessage &&
              <div className={styles.error}>
                {errorMessage}
              </div>}

            <button
              className={styles.tmdbButton}
              onClick={handleTMDBLogin}
              disabled={isLoading}
            >
              <LogIn className={styles.tmdbIcon} size={20} />
              {isLoading ? "Connecting..." : "Sign in with TMDB"}
            </button>

            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>How it works</h3>
              <ol className={styles.infoList}>
                <li>Click the button above to connect with TMDB</li>
                <li>You'll be redirected to TMDB's official site</li>
                <li>Approve access to your account</li>
                <li>You'll be automatically redirected back to MovieDB</li>
              </ol>
            </div>

            <div className={styles.createAccount}>
              <p>Don't have a TMDB account?</p>
              <a
                href="https://www.themoviedb.org/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.createLink}
              >
                Create one <ArrowRight size={14} className={styles.linkIcon} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.posterGrid}>
            {movies.slice(0, 4).map((movie) => (
              <div
              className={styles.posterWrapper}
              style={{ animationDelay: "6s" }}
              key={movie.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt="Movie poster"
                width={300}
                height={450}
                className={styles.poster}
              />
            </div>
            ))}
          </div>
          <div className={styles.overlay}>
            <div className={styles.featureItem}>
              <Star className={styles.featureIcon} />
              <span>Rate your favorite movies</span>
            </div>
            <div className={styles.featureItem}>
              <Clapperboard className={styles.featureIcon} />
              <span>Create custom watchlists</span>
            </div>
            <div className={styles.featureItem}>
              <Film className={styles.featureIcon} />
              <span>Get personalized recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
