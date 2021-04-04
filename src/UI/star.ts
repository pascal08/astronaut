export class Star {
  public readonly offsetX: number;
  public readonly offsetY: number;
  public readonly size: number;
  public hue: number;
  public t: number;

  constructor(offsetX: number, offsetY: number, size: number, hue: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.size = size;
    this.hue = hue;
    this.t = Math.random() * 2 * Math.PI
  }
}