import { Observable, of } from 'rxjs';
import { Customer } from './../../model/customer';
import { Router } from '@angular/router';
import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  list$ = this.customerService.getAll();

  editVisible: boolean = false;

  editObj$: Observable<Customer> = of(new Customer());

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }
  ngOnInit(): void {
  }

  tableButtonClick($event:[string, Customer]){
    if ($event[0] === 'edit') {
      this.editObj$ = this.customerService.getOne($event[1]._id as string);
      this.editVisible = true;
    } else if ($event[0] === 'delete') {
      this.customerService.delete($event[1]._id as string)
    }
  }

  editOkButton(entity: Customer): void {
    this.editVisible = false;
    this.customerService.update(entity).subscribe({
      next: () => {
        this.list$ = this.customerService.getAll();
      }
    })
  }

}
