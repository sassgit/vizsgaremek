import { BaseModel } from './base.model';
import { Artist } from "./artist"
import { Photo } from "./photo";

export class Painting extends BaseModel {
  artist: string | Artist = '';
  title: string = '';
  type: string = '';
  otherInfo?: String = '';
  photos: (string | Photo)[] = [];
  count: number = 1;
  stock: number = 0;
  price?: number = 0;
  override prepareToSend(): void {
    super.prepareToSend();
    if (this.photos)
      this.photos.map(e => e instanceof Photo ? e._id : e);
    if(this.artist && this.artist instanceof Artist)
      this.artist = this.artist._id as string;

  }
}
