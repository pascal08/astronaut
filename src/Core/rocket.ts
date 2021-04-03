export class Rocket {
  private spaceWidth: number;
  private spaceHeight: number;
  private _angle: number;
  private _speed: number;
  private x: number;
  private y: number;
  private driftFactor: number;

  constructor(spaceWidth: number, spaceHeight: number) {
    this.spaceWidth = spaceWidth;
    this.spaceHeight = spaceHeight;
    this.x = spaceWidth / 2;
    this.y = spaceHeight / 2;
    this._angle = 0;
    this._speed = 2;
    this.driftFactor = 1;
  }

  goLeft() {
    this._angle -= this._speed / 20;

    this.drift();
  }

  goUp() {
    let {as, cs} = this.angles();

    this.x += as;
    this.y -= cs;

    this.driftFactor = 1;

    this.drift();
  }

  goRight() {
    this._angle += this._speed / 20;

    this.drift();
  }

  goDown() {
    let {as, cs} = this.angles();

    this.x -= as / 2;
    this.y += cs / 2;

    this.drift();
  }

  drift() {
    let {as, cs} = this.angles();

    this.x += as / this.driftFactor;
    this.y -= cs / this.driftFactor;
    this.driftFactor += 0.05;
  }

  private angles() {
    let as = Math.sin(this._angle) * this._speed;
    let cs = Math.cos(this._angle) * this._speed;
    return {as, cs};
  }

  offsetX() {
    return this.x;
  }

  offsetY() {
    return this.y;
  }

  angle() {
    return this._angle;
  }

  update(timeElapsed: number) {
    this.drift();
  }
}