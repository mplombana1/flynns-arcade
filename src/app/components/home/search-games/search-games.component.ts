import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GamesCollectionService } from 'src/app/services/games-collection.service';
import {
  Platform,
  Result,
  ResultWithFavorite,
} from 'src/app/models/collection.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss'],
})
export class SearchGamesComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  options: Platform[];
  filteredOptions: Observable<Platform[]>;
  platformId: number;
  gameName: string;
  searchResults: Result[];

  isLoading: boolean;

  addSubscription: Subscription;
  deleteSubscription: Subscription;
  collectionSubscription: Subscription;
  platformSubscription: Subscription;

  public readonly searchCntrl: FormControl;
  public readonly searchResults$: Observable<Result[]>;
  constructor(
    private collection: GamesCollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.platformSubscription = this.collection
      .getAllPlatforms()
      .subscribe((res) => {
        this.options = res;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.options.slice()))
        );
      });

    this.collectionSubscription = this.collection
      .getUserCollection()
      .subscribe((res) => (this.collection.userGames = res));
  }

  ngOnDestroy(): void {
    if (this.collectionSubscription) {
      this.collectionSubscription.unsubscribe();
    }
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.platformSubscription) {
      this.platformSubscription.unsubscribe();
    }
  }

  private _filter(name: string): Platform[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(user: Platform) {
    return user && user.name ? user.name : '';
  }

  showPlatformId(e) {
    this.platformId = e.option.value.platformId;
    if (this.gameName) {
      this.collection
        .searchAllGames(this.gameName, {
          platformId: this.platformId,
        })
        .subscribe((res) => {
          this.searchResults = res;
        });
    }
  }

  search(event?: any) {
    this.isLoading = true;
    this.gameName = event.target.value;

    if (this.gameName.length !== 0) {
      this.collection
        .searchAllGames(this.gameName, {
          platformId: this.platformId,
        })
        .subscribe((res) => {
          this.searchResults = res;
          this.isLoading = false;
          if (this.searchResults.length === 0) {
            this.searchResults = null;
          }
        });
    } else {
      this.searchResults = null;
      this.isLoading = false;
    }
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`home/game-details/${id}`]);
  }

  addGame(gameId: number, game: ResultWithFavorite) {
    this.collection.addGameToCollection(gameId).subscribe((res) => {
      game.isFavorite = true;
    });
  }

  removeGame(gameId: number, game: ResultWithFavorite) {
    this.collection.removeGameFromCollection(gameId).subscribe((res) => {
      game.isFavorite = false;
    });
  }
}
