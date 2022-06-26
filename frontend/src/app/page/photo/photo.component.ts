import { Router } from '@angular/router';
import { PhotoService } from './../../service/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  list$ = this.photoService.getAll();

  constructor(
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
