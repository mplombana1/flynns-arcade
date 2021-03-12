import { Component, OnInit } from '@angular/core';
import { GamesCollectionService } from 'src/app/services/games-collection.service';
import { Collection } from '../../../models/collection.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss'],
})
export class UserCollectionComponent implements OnInit {
  isLoading: boolean;
  constructor(
    private collection: GamesCollectionService,
    private router: Router
  ) {}
  games$: Observable<Collection[]>;

  ngOnInit(): void {
    this.games$ = this.collection.getUserCollection();
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`home/game-details/${id}`]);
  }
}
