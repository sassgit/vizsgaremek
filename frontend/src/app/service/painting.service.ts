import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Painting } from '../model/painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingService extends BaseService<Painting> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'painting');
   }
}
