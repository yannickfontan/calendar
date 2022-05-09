import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./components/calendar.module').then(m => m.CalendarModule),
  },
  {
    path: '**',
    redirectTo: '/calendar',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
