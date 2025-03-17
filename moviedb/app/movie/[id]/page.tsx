import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar, Tag, Play, Earth, DollarSign, HandCoins, Clapperboard } from "lucide-react"
import { movies } from "@/data/movies"
import styles from "./page.module.css"
import MovieCard from "@/components/movie-card"
import { SingleMovie } from "@/types/singleMovie"
import movieAPI from "@/lib/api/movies"
import { Movie } from "@/types/movie"
import MovieSlider from "@/components/movie-slider"
import MovieTrailerModal from "@/components/movie-trailer-modal"

interface MoviePageProps {
  params: Promise<{id: string}>
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type MovieCredits = {
  id: number;
  cast: CastMember[]; 
  crew: CrewMember[];
};

type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers'; // Common types from TMDB
  official: boolean;
  id: string;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const {id} = await params
  let movie: SingleMovie = {} as SingleMovie;
  let similarMovies: Movie[] = [];
  let crew: CrewMember[]=[];
  let cast : CastMember[]=[];
  let crewResponse: MovieCredits = {} as MovieCredits;
  let movieVideos: MovieVideo[] = [] as MovieVideo[];
  let intID = parseInt(id, 10);
  let isOpen: boolean = false;

  const onClose = () => {
    isOpen = false;
  }

  try{
    movie = await movieAPI.getSingleMovie(intID);
    similarMovies = await movieAPI.getSimilarMovies(intID);
    crewResponse = await movieAPI.getMovieCredits(intID);
    movieVideos = await movieAPI.getMovieVideos(intID);
    crew = crewResponse.crew.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.id === member.id)
    );
    cast = crewResponse.cast.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.id === member.id)
    );
  }catch(e){
    console.error(e)
  }


  if (!movie) {
    return (
      <div className={styles.notFound}>
        <h1>Movie Not Found</h1>
        <p>The movie you are looking for does not exist.</p>
        <Link href="/" className={styles.backButton}>
          Back to Home
        </Link>
      </div>
    )
  }

  // Get similar movies based on genre

  return (
    <main className={styles.main}
    style={{
      backgroundImage: movie.backdrop_path
      ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`
      : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >

      <div className={styles.content}>
        <div className={styles.movieInfo}
         
        >
          <div className={styles.posterWrapper}>
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}` || "/placeholder.svg"}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 200px, 300px"
              className={styles.poster}
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.meta}>
              <div className={styles.rating}>
                <Star className={styles.starIcon} />
                <span>{Number(movie.vote_average).toFixed(1)}/10</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                <span>{movie.release_date}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock className={styles.metaIcon} />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            <div className={styles.genres}>
              {movie.genres.map((genre) => (
                <Link key={genre.id} href={`#`} className={styles.genre}>
                  <Tag className={styles.genreIcon} size={14} />
                  <span>{genre.name}</span>
                </Link>
              ))}
            </div>

            <p className={styles.overview}>{movie.overview}</p>
            <div className={styles.meta}>
              <div className={styles.metaItem} aria-label="Origin Country">
                <Earth className={styles.metaIcon} />
                <span className={styles.minorInfo}>{movie.origin_country != null ? movie.origin_country.join("/") : `No Info` }</span>
              </div>
              <div className={styles.metaItem}>
                <DollarSign className={styles.metaIcon} />
                <span className={styles.minorInfo}>{movie.budget != 0 ? `Budget: $${movie.budget}` : `Budget: No Info`}</span>
              </div>
              <div className={styles.metaItem}>
                <HandCoins className={styles.metaIcon} />
                <span className={styles.minorInfo}>{movie.budget != 0 ? `Revenue: $${movie.revenue}` : `Revenue: No Info`}</span>
              </div>
            </div>
            {movieVideos.length > 0 ? (
               <MovieTrailerModal 
                isVideo={movieVideos.length > 0}
                trailerKey={movieVideos[0].key} 
                title={movie.title}
                movieId={movie.id}
             />
            ) :(
            <MovieTrailerModal 
                isVideo={movieVideos.length > 0}
                title={movie.title}
                movieId={movie.id}
             />
            )}
           
            <hr className={styles.divider}/>
            <div className={styles.metaSecond}>
              <div className={styles.metaSecondItem}>
                <div className={styles.metaSecondHeader}>
                  <Clapperboard className={styles.metaIcon} />
                  <span>Studios & Production</span>
                </div>
                  <div className={styles.productionCompanies}>
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className={styles.productionCompany}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}` || "/placeholder.svg"}
                          alt={company.name}
                          width={60}
                          height={60}
                          className={styles.productionCompanyLogo}
                        />
                        <span>{company.name}</span>
                      </div>
                ))}
                </div>
              </div>
            </div>
            <hr className={styles.divider}/>
            <div className={styles.crewCastContainer}>
              <div className={styles.cast}>
                <h3>Crew</h3>
                <div className={styles.castList}>
                  {crew.slice(0, 10).map((member, index) => (
                    <Link
                      key={member.id + member.name + index}
                      target="_blank"
                      href={`https://www.themoviedb.org/person/${member.id}`}
                      className={styles.actor}
                    >
                      {member.name}
                    </Link>
                  ))}
                </div>
              </div>
              {cast.length > 0 && (
                <div className={styles.cast}>
                  <h3>Cast</h3>
                  <div className={styles.castList}>
                    {cast.slice(0, 10).map((member, index) => (
                      <Link
                        key={member.id + member.character + index}
                        target="_blank"
                        href={`https://www.themoviedb.org/person/${member.id}`}
                        className={styles.actor}
                      >
                        <span>{member.character}</span>
                        <hr className={styles.divider} />
                        <span>{member.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Similar Movies</h2>
          <div className={styles.similarMovies}>
            <MovieSlider movies={similarMovies} slice={20} sectionTitle="Similar Movies" />
          </div>
        </section>
      </div>
     
    </main>
  )
}

