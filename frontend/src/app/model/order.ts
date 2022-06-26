import { BaseModel } from './base.model';
import { Customer } from "./customer"
import { Painting } from "./painting";

export class Order extends BaseModel {
  customer: string | Customer = '';
  paintings: (string | Painting)[] = [];
  remark?: string;
  status: string = '';
  bill?: String;
  billStatus?: String;
  price: number = 0;
  override prepareToSend(): void {
    super.prepareToSend();
    if (this.customer && this.customer instanceof Customer)
      this.customer = this.customer._id as string;
    if (this.paintings)
      this.paintings.map(e => e instanceof Painting ? e._id : e);
  }
}
