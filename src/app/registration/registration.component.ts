import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  maxDate: string;
 
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.registrationForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)] ],
      lastName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]*$/)] ],
      dob: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value);
      this.router.navigate(['/login']);
    }
  }
}
