import { Component, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-view-person',
  standalone: true,
  imports: [],
  templateUrl: './view-person.component.html',
  styleUrl: './view-person.component.css'
})
export class ViewPersonComponent {

  private client = inject(ClientService)
  private activatedRoute = inject(ActivatedRoute)

  user:User = {} as User;
  id:string = ""

  constructor() {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    console.log("id desde view person", this.id);
    
    
    this.client.getRequest(`http://localhost:4004/odata/v4/person/Person(${this.id})`).subscribe({
      next:(response:any) => {
        console.log(response);  
        this.user = response;      
      },
      error: (error:any) => {
        console.log(error.error.error);        
      },
      complete: () => console.log("complete") 
    })
  }
}
