import { TodosComponent } from './pages/todos/todos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'todos', component: TodosComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: 'todos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
