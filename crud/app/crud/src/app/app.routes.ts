import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { UpdatePersonComponent } from './components/update-person/update-person.component';
import { ViewPersonComponent } from './components/view-person/view-person.component';

export const routes: Routes = [
    {
        path:'manage',
        component:HomeComponent
      },
      {
        path:'createUser',
        component: CreatePersonComponent
      },
      {
        path:'updateUser/:id',
        component: UpdatePersonComponent
      },
      {
        path:'allUsers',
        component: CreatePersonComponent
      },
      {
        path:'viewUser/:id',
        component: ViewPersonComponent
      },
      {
        path: '**',
        redirectTo: 'manage'
      }
];
