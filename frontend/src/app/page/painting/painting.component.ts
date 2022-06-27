import { Photo } from './../../model/photo';
import { of, Observable } from 'rxjs';
import { Artist } from './../../model/artist';
import { Router } from '@angular/router';
import { PaintingService } from './../../service/painting.service';
import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/model/painting';

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

  editVisible: boolean = false;

  editObj$: Observable<Painting> = of(new Painting());

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

  tableButtonClick($event:[string, Painting]){
    if ($event[0] === 'edit') {
      this.editObj$ = this.paintingService.getOne($event[1]._id as string);
      this.editVisible = true;
    } else if ($event[0] === 'delete') {
      this.paintingService.delete($event[1]._id as string)
    }
  }

  changeArtist(entity: Painting): void {

  }

  getArtistName(entity: Painting): string {
    return (entity.artist as Artist)?.fullName;
  }

  selectPhoto(entity: Painting): void {

  }

  deletePhoto(entity: Painting, photo: Photo| string): void {
    entity.photos = entity.photos.filter(e => e != photo);
  }

  editOkButton(entity: Painting): void {
    this.editVisible = false;
    this.paintingService.update(entity).subscribe({
      next: (e) => {
        console.log(e);
        this.list$ = this.paintingService.getAll();
      }
    })
  }

}
