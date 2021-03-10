import { Injectable } from '@angular/core';
import {
  Collection,
  GameDetails,
  Platform,
  Search,
} from 'src/app/models/collection.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesCollectionService {
  url = environment.apiURL;

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

  searchAllGames(gameName: string, platformId: number) {
    return this.http.get<Search>(
      `${this.url}/Games/search/${gameName}?platform${platformId}`
    );
  }
}
