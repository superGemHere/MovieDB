import type { MetadataRoute } from 'next'
import movieAPI from "@/lib/api/movies"; // Import movie API
import { genreMapping } from "@/lib/genreMapping"; // Import genre mapping
import { Genre } from '@/types/movie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trendingMovies = await movieAPI.getTrendingMovies(1);
  const topRatedMovies = await movieAPI.getTopRatedMovies(1);
  const comingSoonMovies = await movieAPI.getComingSoonMovies(1);
  const genres = await movieAPI.getGenres(); 

  const categoryPages = ["trending", "top-rated", "coming-soon"].map((category) => ({
    url: `${BASE_URL}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const genrePages = genres
    .map((genre: Genre) => {
      const slug = Object.keys(genreMapping).find(
        (key) => genreMapping[key].toLowerCase() === genre.name.toLowerCase()
      );
      return slug
        ? {
            url: `${BASE_URL}/category/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
          }
        : null;
    })
    .filter(Boolean);

  const allMovies = [
    ...(trendingMovies.results || []),
    ...(topRatedMovies.results || []),
    ...(comingSoonMovies.results || []),
  ];

  const movieUrls = allMovies.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/movies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryPages,
    ...genrePages,
    ...movieUrls,
  ];
}