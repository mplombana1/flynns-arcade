import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesCollectionService } from 'src/app/services/games-collection.service';
import { Platform, Search } from 'src/app/models/collection.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss'],
})
export class SearchGamesComponent implements OnInit {
  myControl = new FormControl();
  options: Platform[];
  filteredOptions: Observable<Platform[]>;
  platformId: number;
  gameName: string;
  $searchResults: Observable<Search>;
  searchResults: Search[];

  constructor(
    private collection: GamesCollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.collection.getAllPlatforms().subscribe((res) => {
      this.options = res;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filter(name) : this.options.slice()))
      );
    });
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
  }

  search(event: any) {
    console.log(event.target.value);
    this.gameName = event.target.value;

    console.log(this.platformId, 'PLATFORM');
    if (this.gameName.length !== 0) {
      this.collection
        .searchAllGames(this.gameName, this.platformId)
        .subscribe((res) => {
          console.log(res);
          this.searchResults = res;
        });
    } else {
      this.$searchResults = null;
    }
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`home/game-details/${id}`]);
  }

  addGame(gameId: number) {
    this.collection.addGameToCollection(gameId).subscribe((res) => {
      console.log(res, 'res');
    });
  }
}
