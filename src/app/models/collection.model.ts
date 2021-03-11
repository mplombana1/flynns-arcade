export class Collection {
  imageUrl?: string;
  gameId: number;
  title: string;
  platform: string;
}
export class GameDetails {
  gameId: number;
  title: string;
  overview: string;
  releaseDate: string;
  genres: string[];
  publishers: string[];
  platform: Platform;
  imageUrl?: string;
}

export class Platform {
  platformId: number;
  name: string;
}

export class Result {
  gameId: number;
  title: string;
  platform: string;
}

export class ResultWithFavorite {
  gameId: number;
  title: string;
  platform: string;
  isFavorite: boolean;
}
