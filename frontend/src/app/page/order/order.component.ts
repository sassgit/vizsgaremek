import { CustomerService } from './../../service/customer.service';
import { of, tap, switchMap } from 'rxjs';
import { OrderService } from './../../service/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  list$ = this.orderService.getAll();

  public interpreterBound!: Function;

  public customerInterpreterMode = 'customer.fullName';
  public paintingInterpreterMode = 'paintings.length';

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  interpreterCallBack(mode: string, data: any) {
    console.log(mode, data);
    if (mode === this.customerInterpreterMode) {
      return data?.fullName;
    } else if (mode === this.paintingInterpreterMode) {
      return data.length;
    } else {
      return '';
    }
  }

}
