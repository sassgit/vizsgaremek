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

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  tableButtonClick($event:[string, Artist]){
    console.log($event);
  }

}
