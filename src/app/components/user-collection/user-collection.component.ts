import { Component, OnInit } from '@angular/core';
import { GamesCollectionService } from '../../services/games-collection.service';
import { Collection } from '../../models/collection.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss'],
})
export class UserCollectionComponent implements OnInit {
  constructor(private collection: GamesCollectionService) {}
  $games: Observable<Collection[]>;

  ngOnInit(): void {
    this.$games = this.collection.getUserCollection();
  }
}
