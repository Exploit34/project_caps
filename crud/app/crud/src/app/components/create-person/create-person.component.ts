import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css'
})
export class CreatePersonComponent {

  form: FormGroup;

  private client = inject(ClientService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  constructor() {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.min(1)]]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {

    if (this.form.valid) {
      let user:User = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        password: this.form.value.password,
        age: this.form.value.age
      }

      this.client.postRequest(`http://localhost:4004/odata/v4/person/Person`, user).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("registrado")
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
