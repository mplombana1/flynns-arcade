import { Injectable } from '@angular/core';
import {
  Collection,
  GameDetails,
  Platform,
  Result,
  ResultWithFavorite,
} from 'src/app/models/collection.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GamesCollectionService {
  url = environment.apiURL;
  userGames: Collection[];
  constructor(private http: HttpClient) {}

  getUserCollection() {
    return this.http.get<Collection[]>(`${this.url}/Collection`);
  }

  getGameDetails(id: string) {
    return this.http.get<GameDetails>(`${this.url}/Games/${id}`);
  }

  getAllPlatforms() {
    return this.http.get<Platform[]>(`${this.url}/Platforms`);
  }

  searchAllGames(gameName: string, platformId?: any) {
    if (platformId.platformId) {
      var params = platformId;
      return this.http
        .get<Result[]>(`${this.url}/Games/search/${gameName}`, {
          params: params,
        })
        .pipe(
          map((allResults: Result[]): Result[] => allResults.slice(0, 10)),
          map((FirstTenResults: Result[]): ResultWithFavorite[] =>
            FirstTenResults.map(
              (result): ResultWithFavorite => {
                return {
                  ...result,
                  isFavorite: this.userGames.some(
                    (game: Collection): boolean => game.gameId === result.gameId
                  ),
                };
              }
            )
          )
        );
    } else {
      return this.http
        .get<Result[]>(`${this.url}/Games/search/${gameName}`)
        .pipe(
          map((allResults: Result[]): Result[] => allResults.slice(0, 10)),
          map((FirstTenResults: Result[]): ResultWithFavorite[] =>
            FirstTenResults.map(
              (result): ResultWithFavorite => {
                return {
                  ...result,
                  isFavorite: this.userGames.some(
                    (game: Collection): boolean => game.gameId === result.gameId
                  ),
                };
              }
            )
          )
        );
    }
  }

  addGameToCollection(gameId: number) {
    return this.http.post(`${this.url}/Collection/${gameId}`, gameId);
  }

  removeGameFromCollection(gameId: number) {
    return this.http.delete(`${this.url}/Collection/${gameId}`);
  }
}
