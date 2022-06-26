export class BaseModel {
  _id?: string;
  prepareToSend(): void {
    delete this._id;
  };
}
