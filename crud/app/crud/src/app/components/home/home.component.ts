import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  users:User[] = [];

  private client = inject(ClientService)
  private router = inject(Router);

  constructor() {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.client.getRequest(`api/odata/v4/person/Person?`).subscribe({
      next: (response: any) => {
        console.log("getUsers", response.value);
        this.users = response.value

      }, error: (error: any) => {
        console.log(error.error.error);

      }, complete: () => console.log("complete")
    })
  }

  createUser() {
    this.router.navigate(['/createUser'])
  }

  viewUser(id:string) {
    console.log("EEE", id);
    
    this.router.navigate(['/viewUser', id])
  }

  updateUser(id:string) {
    this.router.navigate(['updateUser', id]);
  }

  deleteUser(id:string) {
    this.client.deleteRequest(`http://localhost:4004/odata/v4/person/Person(${id})`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getUsers()

      }, error: (error: any) => {
        console.log(error);

      }, complete: () => console.log("complete")
    })
  }

}

