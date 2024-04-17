import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-person.component.html',
  styleUrl: './update-person.component.css'
})
export class UpdatePersonComponent {

  private client = inject(ClientService)
  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  
  form: FormGroup
  id: string = ""
  data: User = {} as User;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.minLength(1)]]
    })
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.client.getRequest(`http://localhost:4004/odata/v4/person/Person(${this.id})`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response;

        this.form.patchValue({
          name: this.data.name,
          lastName: this.data.lastName,
          email: this.data.email,
          password: this.data.password,
          age:this.data.age
        }
        )
      },
      error: (error: any) => {
        console.log(error.error.error);
      },
      complete: () => console.log("complete")
    })

  }

  submitForm() {
    // if (this.form.valid && !this.form.pristine) {
    if (!this.form.pristine) {

      console.log("entraria?");
      
      let user: User = {
        ID: this.data.ID,
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        password: this.form.value.password,
        age: this.form.value.age
      }

      this.client.updateRequest(`api/odata/v4/person/Person(${this.id})`, user).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("actualizado")
          this.router.navigate(['/manage'])

        }, error: (error: any) => {
          alert(error.error.error)
          console.log(error);

        }, complete: () => console.log("complete")
      })

    } else {
      alert("revise los campos")
    }
  }
}
