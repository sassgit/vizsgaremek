import { Router } from '@angular/router';
import { PaintingService } from './../../service/painting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

   list$ = this.paintingService.getAll();

  public interpreterBound!: Function;

  public artistInterpreterMode = 'artist.fullName';
  public photoInterpreterMode = 'photos.length';

  constructor(
    private paintingService: PaintingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  interpreterCallBack(mode: string, data: any) {
    if (mode === this.artistInterpreterMode) {
      return data?.fullName;
    } else if (mode === this.photoInterpreterMode) {
      return data.length;
    } else {
      return '';
    }
  }

}
