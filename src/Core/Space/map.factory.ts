import { Region } from './region';
import { Game } from '../../Application/game';
import { Space } from './space';
import { Map } from './map';
import { Location } from './location';

export class MapFactory {

  static createMap(horizontalSpaceRegions: number, verticalSpaceRegions: number): Map {
    let regions: Array<Region> = [];
    let totalSpaceRegions = horizontalSpaceRegions * verticalSpaceRegions;
    for (let i = 1; i <= totalSpaceRegions; i++) {
      let space = new Space(
        Game._canvasWidth,
        Game._canvasHeight,
      );

      let x = i * Game._canvasWidth;
      let y = i % horizontalSpaceRegions * Game._canvasHeight;

      let location = new Location(x, y);

      regions.push(new Region(space, location));
    }

    return new Map(regions, horizontalSpaceRegions);
  }
}