import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userDetails: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.usersService.getUserById(+id).subscribe({
            next: (response) => {
              this.userDetails = response;
            },
          });
        }
      },
    });
  }
  updateUser() {
    this.usersService
      .updateUser(this.userDetails.id, this.userDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['users']);
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        this.router.navigate(['users']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
