import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  list$ = this.userService.getAll();

  editVisible: boolean = false;

  editObj$: Observable<User> = of(new User());

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  tableButtonClick($event:[string, User]){
    if ($event[0] === 'edit') {
      this.editObj$ = this.userService.getOne($event[1]._id as string);
      this.editVisible = true;
    } else if ($event[0] === 'delete') {
      this.userService.delete($event[1]._id as string)
    }
  }

  editOkButton(entity: User): void {
    this.editVisible = false;
    this.userService.update(entity).subscribe({
      next: () => {
        this.list$ = this.userService.getAll();
      }
    })
  }

  ngOnInit(): void {
  }

}
