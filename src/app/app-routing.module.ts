import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { UserCollectionComponent } from './components/user-collection/user-collection.component';
import { SearchGamesComponent } from './components/search-games/search-games.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user-collection',
    component: UserCollectionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchGamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
