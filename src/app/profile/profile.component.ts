// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { User } from 'src/user.model';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html'
// })
// export class ProfileComponent {
//   @Input() user: User | null = null;
//   @Output() save = new EventEmitter<User>();

//   profileForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.profileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       dob: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   ngOnChanges(): void {
//     if (this.user) {
//       this.profileForm.patchValue(this.user);
//     }
//   }

//   onSubmit() {
//     if (this.profileForm.valid) {
//       this.save.emit(this.profileForm.value); // Emit the save event with updated user
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../user.service';
// import { User } from 'src/user.model';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html'
// })
// export class ProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   user: User | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private userService: UserService,
//     private router: Router
//   ) {
//     this.profileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       dob: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       const email = params['email'];
//       // Ensure user is set to null if not found
//       const foundUser = this.userService.getUsers().find(u => u.email === email);
//       this.user = foundUser ?? null;

//       if (this.user) {
//         this.profileForm.patchValue(this.user);
//       }
//     });
//   }

//   onSave() {
//     if (this.profileForm.valid) {
//       this.userService.updateUser(this.profileForm.value);
//       this.router.navigate(['/dashboard']);
//     }
//   }
// }

import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css']
})
export class ProfileComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Input() isEdit: boolean = false;

  profileForm: FormGroup;
  maxDate: string;
 

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.user) {
      // Update form fields with user information
      this.profileForm.patchValue(this.user);
    }
  }

  onSave() {
    if (this.profileForm.valid) {
      // Emit the save event with the updated user data
      this.save.emit(this.profileForm.value);
    }
  }
}
