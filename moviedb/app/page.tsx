import Link from "next/link";
import { TrendingUp, Star, Clock } from "lucide-react";
import SearchBar from "@/components/search-bar";
import styles from "./page.module.css";
import movieAPI from "../lib/api/movies";
import MovieSlider from "@/components/movie-slider";
import type { Movies } from "@/types/PaginatedMovies";
import logo from "@/public/logo.webp";
import { Metadata } from "next";
import Head from "next/head";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home | MovieDB",
    description: "Discover the latest and greatest movies all in one place.",
    openGraph: {
      title: "MovieDB",
      description: "Explore trending, top-rated, and upcoming movies.",
      images: [
        {
          url: logo.src,
          width: 800,
          height: 600,
          alt: "MovieDB Logo",
        },
      ],
    },
  };
};

export default async function Home() {
  const trendingMovies: Movies = await movieAPI.getTrendingMovies() as Movies;
  const topRatedMovies: Movies = await movieAPI.getTopRatedMovies() as Movies;
  const comingMovies: Movies = await movieAPI.getComingSoonMovies() as Movies;

  console.log("movies", trendingMovies);

  return (
    <>
     <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MovieDB",
              "description": "Discover the latest and greatest movies all in one place.",
              "url": "https://moviedb-virid.vercel.app/",
              "image": "https://moviedb-virid.vercel.app/logo.webp", 
            }),
          }}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://moviedb-virid.vercel.app/" />
      </Head>
      <main className={styles.main}>
        <section
          className={styles.hero}
          style={{
            backgroundImage: logo
              ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${logo.src})`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.heroContent}>
            <h1>Discover Amazing Movies</h1>
            <p>Find the latest and greatest films all in one place</p>
            <SearchBar />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <TrendingUp className={styles.sectionIcon} />
            <h2>Trending Now</h2>
            <Link href="/category/trending" className={styles.viewAll}>
              View All
            </Link>
          </div>
          <MovieSlider movies={trendingMovies.results} sectionTitle="Trending Now" />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Star className={styles.sectionIcon} />
            <h2>Top Rated</h2>
            <Link href="/category/top-rated" className={styles.viewAll}>
              View All
            </Link>
          </div>
          <MovieSlider movies={topRatedMovies.results} sectionTitle="Top Rated" />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Clock className={styles.sectionIcon} />
            <h2>Coming Soon</h2>
            <Link href="/category/coming-soon" className={styles.viewAll}>
              View All
            </Link>
          </div>
          <MovieSlider movies={comingMovies.results} sectionTitle="Coming Soon" />
        </section>
      </main>
    </>
  );
}
