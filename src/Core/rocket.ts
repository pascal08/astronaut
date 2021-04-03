interface Vector {
  x: number;
  y: number;
}

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
    this._speed = 1;
    this.driftFactor = 1;
  }

  adjustOffsetX(dx: number): void {
    this.x += dx;

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > this.spaceWidth) {
      this.x = this.spaceWidth;
    }
  }

  adjustOffsetY(dy: number): void {
    this.y += dy;

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.y > this.spaceHeight) {
      this.y = this.spaceHeight;
    }
  }

  goLeft(): void {
    this._angle -= this._speed / 10;

    this.drift();
  }

  goRight(): void {
    this._angle += this._speed / 10;

    this.drift();
  }

  goUp(): void {
    const {x, y} = this.speedVector();

    this.adjustOffsetX(x);
    this.adjustOffsetY(-y);

    this.driftFactor = 1;

    this.drift();
  }

  goDown(): void {
    const {x, y} = this.speedVector();

    this.adjustOffsetX(-x / 2);
    this.adjustOffsetY(y / 2);

    this.drift();
  }

  drift(): void {
    const {x, y} = this.speedVector();

    this.adjustOffsetX(x / this.driftFactor);
    this.adjustOffsetY(-y / this.driftFactor);

    this.driftFactor += 0.05;
  }

  private speedVector(): Vector {
    const x = Math.sin(this._angle) * this._speed;
    const y = Math.cos(this._angle) * this._speed;
    return {x, y};
  }

  offsetX(): number {
    return this.x;
  }

  offsetY(): number {
    return this.y;
  }

  angle(): number {
    return this._angle;
  }

  update(): void {
    this.drift();
  }
}