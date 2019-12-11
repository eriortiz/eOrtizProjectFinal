import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: './details/details.module#DetailsPageModule'
  },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'addfriend', loadChildren: './addfriend/addfriend.module#AddfriendPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
