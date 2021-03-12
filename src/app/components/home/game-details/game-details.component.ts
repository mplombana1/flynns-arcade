import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesCollectionService } from 'src/app/services/games-collection.service';
import { GameDetails } from 'src/app/models/collection.model';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  gameDetails$: Observable<GameDetails>;

  constructor(
    private router: ActivatedRoute,
    private collection: GamesCollectionService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.gameDetails$ = this.collection.getGameDetails(id);
  }
}
