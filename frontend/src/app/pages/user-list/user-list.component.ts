import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => (this.error = err.error?.message || 'Failed to load users'),
    });
  }

  roleClass(role: string): string {
    return role.toLowerCase().replace(' ', '-');
  }

  roleIcon(role: string): string {
    const icons: Record<string, string> = {
      Manager: 'bi-briefcase-fill',
      'Team Lead': 'bi-diagram-3-fill',
      Employee: 'bi-person-fill',
    };
    return icons[role] ?? 'bi-person-fill';
  }
}
