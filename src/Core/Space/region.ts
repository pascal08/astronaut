import { Space } from './space';
import { Location } from './location';

export class Region {
  private _space: Space;
  private _location: Location;

  constructor(space: Space, location: Location) {
    this._space = space;
    this._location = location;
  }

  space(): Space {
    return this._space;
  }

  location(): Location {
    return this._location;
  }
}