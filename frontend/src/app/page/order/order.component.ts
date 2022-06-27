import { Painting } from './../../model/painting';
import { Customer } from './../../model/customer';
import { Order } from './../../model/order';
import { of, Observable, switchMap } from 'rxjs';
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

  editVisible: boolean = false;

  editObj$: Observable<Order> = of(new Order());

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  interpreterCallBack(mode: string, data: any) {
    if (mode === this.customerInterpreterMode) {
      return data?.fullName;
    } else if (mode === this.paintingInterpreterMode) {
      return data.length;
    } else {
      return '';
    }
  }

  tableButtonClick($event:[string, Order]){
    if ($event[0] === 'edit') {
      this.editObj$ = this.orderService.getOne($event[1]._id as string);
      this.editVisible = true;
    } else if ($event[0] === 'delete') {
      this.orderService.delete($event[1]._id as string)
    }
  }

  editOkButton(entity: Order): void {
    this.editVisible = false;
    this.orderService.update(entity).subscribe({
      next: (e) => {
        console.log(e);
        this.list$ = this.orderService.getAll();
      }
    })
  }

  getCustomerName(entity: Order): string {
    return (entity.customer as Customer)?.fullName;
  }

  changeCustomer(entity: Order): void {

  }

  selectPainting(entity: Order): void {

  }

  deletePainting(entity: Order, painting: Painting| string): void {
    entity.paintings = entity.paintings.filter(e => e != painting);
  }

}
