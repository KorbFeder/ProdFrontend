import { TodosComponent } from './pages/todos/todos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FitComponent } from './pages/fit/fit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './pages/food/food.component';

const routes: Routes = [
  {path: 'todos', component: TodosComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'fit', component: FitComponent},
  {path: 'food', component: FoodComponent},
  {path: '', redirectTo: 'todos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
