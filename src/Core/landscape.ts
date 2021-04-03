export class Landscape {
  public readonly offsetX: number;
  public readonly offsetY: number;
  public readonly width: number;
  public readonly height: number;
  public readonly craters: Array<Array<number>> = [];

  constructor(offsetX: number, offsetY: number, width: number, height: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;
    this.createCraters();
  }

  createCraters(): void {
    let offsetX;

    offsetX = -250;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 20, 0.7, offsetX / 10000 * Math.PI]);
    offsetX = -180;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 30, 0.9, offsetX / 10000 * Math.PI]);
    offsetX = -100;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 70, 0.6, offsetX / 10000 * Math.PI]);
    offsetX = -70;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 25, 0.8, offsetX / 10000 * Math.PI]);
    offsetX = 20;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 50, 0.7, offsetX / 10000 * Math.PI]);
    offsetX = 40;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 5, 0.9, offsetX / 10000 * Math.PI]);
    offsetX = 120;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 25, 0.8, offsetX / 10000 * Math.PI]);
    offsetX = 150;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 70, 0.8, offsetX / 10000 * Math.PI]);
    offsetX = 250;
    this.craters.push([this.offsetX + offsetX, this.offsetY - 30, 0.9, offsetX / 10000 * Math.PI]);
  }
}