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

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }
  ngOnInit(): void {
  }

}
