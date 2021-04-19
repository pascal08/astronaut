import { Region } from './region';

export class Map {
  private readonly _regions: Array<Region> = [];
  private _activeRegionIndex: number;
  private _horizontalSpaceRegions: number;
  private _verticalSpaceRegions: number;

  constructor(regions: Array<Region>, horizontalSpaceRegions: number) {
    if (regions.length === 0) {
      throw new Error('No regions.');
    }
    this._regions = regions;
    this._horizontalSpaceRegions = horizontalSpaceRegions;
    this._verticalSpaceRegions = Math.floor(regions.length / horizontalSpaceRegions);
    this._activeRegionIndex = 0;
  }

  activeRegion() {
    return this._regions[this._activeRegionIndex];
  }

  moveToEastRegion() {
    if (this._activeRegionIndex % this._horizontalSpaceRegions === this._horizontalSpaceRegions - 1) {
      return false;
    }

    this._activeRegionIndex++;
    return true;
  }

  moveToNorthRegion() {
    if (this._activeRegionIndex < this._horizontalSpaceRegions) {
      return false;
    }

    this._activeRegionIndex -= this._horizontalSpaceRegions;
    return true;
  }

  moveToWestRegion() {
    if (this._activeRegionIndex % this._horizontalSpaceRegions === 0) {
      return false;
    }

    this._activeRegionIndex--;
    return true;
  }

  moveToSouthRegion() {
    if (this._activeRegionIndex >= this._regions.length - this._horizontalSpaceRegions) {
      return false;
    }

    this._activeRegionIndex += this._horizontalSpaceRegions;
    return true;
  }

  regions() {
    return this._regions;
  }

  verticalSpaceRegions() {
    return this._verticalSpaceRegions;
  }

  horizontalSpaceRegions() {
    return this._horizontalSpaceRegions;
  }

  mapWidth() {
    return this._regions[0].space().width * this._horizontalSpaceRegions;
  }

  mapHeight() {
    return this._regions[0].space().height * this._verticalSpaceRegions;
  }
}