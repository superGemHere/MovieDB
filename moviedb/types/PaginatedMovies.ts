import { Movie } from './movie';

interface Movies {
   results: Movie[];
   totalPages: number;
   totalResults: number;
 }

 export type { Movies };