import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.model';
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
}
