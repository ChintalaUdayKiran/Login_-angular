import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Private subject holding user data
  private users = new BehaviorSubject<User[]>(this.loadUsersFromStorage());
  // Public observable for components to subscribe to
  users$ = this.users.asObservable();

  private currentUser = new BehaviorSubject<User | null>(
    this.loadCurrentUser()
  );
  currentUser$ = this.currentUser.asObservable();

  // Register a new user and log the updated data
  registerUser(user: User) {
    const updatedUsers = [...this.users.value, user];
    console.log('Registering user:', user);
    console.log('Updated users:', updatedUsers);
    this.saveUsersToStorage(updatedUsers);
    this.users.next(updatedUsers);
  }

  // Authenticate a user
  login(email: string, password: string): boolean {
    const user = this.users.value.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser.next(user);
      this.saveCurrentUserToStorage(user.email); // Persist current user email
      return true;
    }
    return false;
  }

  // Your other methods like registerUser, login, etc.

  logout() {
    // Set the current user to null to "log out"
    this.currentUser.next(null);
    localStorage.removeItem('currentUserEmail'); // Remove current user email from localStorage
  }

  // Update an existing user and log changes
  updateUser(updatedUser: User) {
    const updatedUsers = this.users.value.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    this.saveUsersToStorage(updatedUsers);
    this.users.next(updatedUsers);

    // Update current user if it's being modified
    if (
      this.currentUser.value &&
      this.currentUser.value.email === updatedUser.email
    ) {
      this.currentUser.next(updatedUser);
      this.saveCurrentUserToStorage(updatedUser.email);
    }
  }

  private loadCurrentUser(): User | null {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      return this.users.value.find((u) => u.email === currentUserEmail) || null;
    }
    return null;
  }

  // Access current users directly (for internal usage only)
  getUsers(): User[] {
    return this.users.value;
  }

  // Load user data from localStorage and log the results
  private loadUsersFromStorage(): User[] {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log('Loaded users from storage:', users);
    return users;
  }

  // Save user data to localStorage
  private saveUsersToStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Saved users to storage:', users);
  }

  private saveCurrentUserToStorage(email: string) {
    localStorage.setItem('currentUserEmail', email);
  }
}
