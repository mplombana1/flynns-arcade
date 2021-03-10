import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { SearchGamesComponent } from './search-games/search-games.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

// ANGULAR MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: 'collection',
    component: UserCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'game-details/:id',
    component: GameDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchGamesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    UserCollectionComponent,
    GameDetailsComponent,
    SearchGamesComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
})
export class HomeModule {}
