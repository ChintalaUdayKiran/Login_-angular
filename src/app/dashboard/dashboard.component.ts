import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  selectedUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  selectUser() {
    this.selectedUser = this.currentUser;
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser);
    this.selectedUser = null;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
