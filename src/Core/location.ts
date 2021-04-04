export class Location {
  public readonly x: number;
  public readonly y: number;
  private readonly xMin: number | null;
  private readonly xMax: number | null;
  private readonly yMin: number | null;
  private readonly yMax: number | null;

  constructor(
    x: number,
    y: number,
    xMin: number | null = null,
    xMax: number | null = null,
    yMin: number | null = null,
    yMax: number | null = null,
  ) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;

    this.x = Location.constrain(x, xMin, xMax);
    this.y = Location.constrain(y, yMin, yMax);
  }

  update(x: number, y: number): Location {
    return new Location(x, y, this.xMin, this.xMax, this.yMin, this.yMax);
  }

  private static constrain(x: number, min: number | null, max: number | null) {
    if (min !== null && x < min) {
      return min;
    }
    if (max !== null && x > max) {
      return max;
    }

    return x;
  }
}