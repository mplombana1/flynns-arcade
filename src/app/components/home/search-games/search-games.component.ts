import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesCollectionService } from 'src/app/services/games-collection.service';
import { Platform } from 'src/app/models/collection.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss'],
})
export class SearchGamesComponent implements OnInit {
  myControl = new FormControl();
  options: Platform[];
  filteredOptions: Observable<Platform[]>;
  platformId: number = null;

  constructor(private collection: GamesCollectionService) {}

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
    if (name.length === 1) {
      console.log('no name');
      this.platformId = null;
      console.log(this.platformId);
    }
    const filterValue = name.toLowerCase();
    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(user: Platform) {
    if (user) {
      this.platformId = user.platformId;

      console.log('this.platformId:', this.platformId);
    } else {
      this.platformId = null;
    }
    return user && user.name ? user.name : '';
  }
  search(event: any) {
    console.log(event.target.value);
    const gameName = event.target.value;
    console.log('gameName:', gameName.length);
    if (gameName.length !== 0) {
      this.collection
        .searchAllGames(gameName, this.platformId)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
