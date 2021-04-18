import { Location } from './Space/location';

export class Planet {
  private _location: Location;
  private _radius: number;
  public readonly name: string = 'earth';

  constructor(location: Location, radius: number) {
    this._location = location;
    this._radius = radius;
  }

  location(): Location {
    return this._location;
  }

  radius(): number {
    return this._radius;
  }

}