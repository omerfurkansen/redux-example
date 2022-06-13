export interface Content {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SelectedContent {
  Title: string;
  imdbRating: string;
  imdbVotes: string;
  Runtime: string;
  Year: string;
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Language: string;
  Awards: string;
  Poster: string;
}

export interface MovieState {
  movies: Content[];
  series: Content[];
  selectedContent: SelectedContent | null;
  status: 'idle' | 'loading' | 'error';
  search: boolean;
}

export interface MovieCardProps {
  data: Content;
}
