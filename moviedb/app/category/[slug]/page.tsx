import { TrendingUp, Star, Clock, Clapperboard } from "lucide-react";
import MovieCard from "@/components/movie-card";
import styles from "./page.module.css";
import movieAPI from "@/lib/api/movies";
import PaginationControls from "../../../components/PaginationControls";
import { Movies } from "@/types/PaginatedMovies";
import BottomPagination from "@/components/BottomPagination";
import { genreMapping } from "@/lib/genreMapping";
import type { Genre } from "@/types/movie";
import Head from "next/head";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const page = (await searchParams).page || "1";
  const pageNumber = parseInt(page, 10) || 1;
  let genres: Genre[] = await movieAPI.getGenres();
  const normalizedSlug = genreMapping[slug] || slug;
  let genreId: number | undefined = genres.find((genre: Genre) => 
    genre.name.toLowerCase() === normalizedSlug.toLowerCase()
  )?.id;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  let categoryTitle = "";
  let CategoryIcon = TrendingUp;

  switch (slug) {
    case "trending":
      categoryTitle = "Trending Movies";
      CategoryIcon = TrendingUp;
      break;
    case "top-rated":
      categoryTitle = "Top Rated Movies";
      CategoryIcon = Star;
      break;
    case "coming-soon":
      categoryTitle = "Coming Soon";
      CategoryIcon = Clock;
      break;
    default:
      categoryTitle = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Movies`;
      CategoryIcon = Clapperboard;
  }

  let movies: Movies = { results: [], totalPages: 0, totalResults: 0 };

  switch (slug) {
    case "trending":
      movies = await movieAPI.getTrendingMovies(pageNumber) as Movies;
      break;
    case "top-rated":
      movies = await movieAPI.getTopRatedMovies(pageNumber) as Movies;
      break;
    case "coming-soon":
      movies = await movieAPI.getComingSoonMovies(pageNumber) as Movies;
      break;
    default:
      if (genreId !== undefined) {
        movies = await movieAPI.getMoviesByGenre(genreId, pageNumber) as Movies;
      } else {
        console.error(`Genre ID not found for slug: ${slug}`);
      }
  }

  const metaDescription = `Explore the best ${categoryTitle.toLowerCase()} and discover new movies.`;
  const canonicalUrl = `${BASE_URL}/category/${slug}`;

  return (
    <>
      <Head>
        <title>{categoryTitle} | MovieDB Info</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": categoryTitle,
              "description": metaDescription,
              "url": canonicalUrl,
              "mainEntityOfPage": {
                "@type": "WebSite",
                "@id": `${BASE_URL}/`,
              },
              "image": `${BASE_URL}/logo.webp`,
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <CategoryIcon className={styles.categoryIcon} />
            <h1 className={styles.title}>{categoryTitle}</h1>
          </div>

          <div className={styles.stats}>
            <PaginationControls pathName="category" maxPageCount={movies.totalPages} />
            <span>
              {movies.totalPages} {`${movies.totalPages === 1 ? "Page" : "Pages"}`}
            </span>
          </div>
        </div>

        {movies.totalResults > 0 ? (
          <div className={styles.movieGrid}>
            {movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No movies found</h2>
            <p>We couldn't find any movies in this category.</p>
          </div>
        )}
        <BottomPagination totalPages={movies.totalPages} pathName="category" />
      </main>
    </>
  );
};

export default CategoryPage;
