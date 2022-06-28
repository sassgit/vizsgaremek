import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ArtistService } from './../../service/artist.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/model/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  list$ = this.artistService.getAll();

  editVisible: boolean = false;

  editObj$: Observable<Artist> = of(new Artist());

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  tableButtonClick($event:[string, Artist]){
    if ($event[0] === 'edit') {
      this.editObj$ = this.artistService.getOne($event[1]._id as string);
      this.editVisible = true;
    } else if ($event[0] === 'delete') {
      this.artistService.delete($event[1]._id as string)
    }
  }

  editOkButton(entity: Artist): void {
    this.editVisible = false;
    this.artistService.update(entity).subscribe({
      next: () => {
        this.list$ = this.artistService.getAll();
      }
    })
  }

}
