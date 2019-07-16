import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule,
   MatBottomSheetModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosComponent } from './pages/todos/todos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FitComponent } from './pages/fit/fit.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/todo.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    SettingsComponent,
    FitComponent,
    AddTodoComponent,
    DeleteTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,

    StoreModule.forRoot({todos: reducer})
  ],
  entryComponents: [AddTodoComponent, DeleteTodoComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
