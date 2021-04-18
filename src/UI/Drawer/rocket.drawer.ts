import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';
import { RocketInterface } from '../../Core/Rocket/rocket.interface';

export class RocketDrawer extends Drawer {
    private p5: p5;
    private rocket: RocketInterface;

    private readonly _bodyWidth = 25;
    private readonly _bodyHeight = 50;

    private readonly _noseHeight = 20;

    private readonly _engineHeight = 10;

    private readonly fumesHeight = 60;

    constructor(rocket: RocketInterface, p5: p5) {
        super();
        this.rocket = rocket;
        this.p5 = p5;
    }

    draw(): void {
        this.p5.translate(this.rocket.offsetX(), this.rocket.offsetY());
        this.p5.scale(this.rocket.scale());
        this.p5.rotate(this.rocket.angle());

        this.drawFumes();
        this.drawRocket();
    }

    private drawRocket() {
        this.p5.fill('#ffffff');
        // this.p5.arc(0, -25, 25, 50, Math.PI, 2 * Math.PI);
        // this.p5.triangle(-2.5, -48, 2.5, -48, 0, -75);
        // this.p5.circle(0, -70, 3);
        this.p5.triangle(
          -this._bodyWidth / 2,
          -this._bodyHeight / 2 + 1,
          this._bodyWidth / 2,
          -this._bodyHeight / 2 + 1,
          0,
          -this._bodyHeight / 2 -this._noseHeight
        );
        this.p5.rect(
          -this._bodyWidth / 2,
          -this._bodyHeight / 2,
          this._bodyWidth,
          this._bodyHeight,
          3,
          3
        );

        let finWidth = 12.5;
        let finHeight = 30;
        let finSharpness = 10;
        let finMountOffsetFromBottom = 30;
        this.p5.fill('#ff0000');
        this.p5.triangle(
          -this._bodyWidth / 2,
          this._bodyHeight / 2 - finMountOffsetFromBottom,
          -this._bodyWidth / 2,
          this._bodyHeight / 2 - finMountOffsetFromBottom + finHeight,
          -this._bodyWidth / 2 - finWidth,
          this._bodyHeight / 2 - finMountOffsetFromBottom + finHeight + finSharpness
        );
        this.p5.triangle(
          this._bodyWidth / 2,
          this._bodyHeight / 2 - finMountOffsetFromBottom,
          this._bodyWidth / 2,
          this._bodyHeight / 2 - finMountOffsetFromBottom + finHeight,
          this._bodyWidth / 2 + finWidth,
          this._bodyHeight / 2 - finMountOffsetFromBottom + finHeight + finSharpness
        );

        this.p5.fill('#ff0000');
        this.p5.ellipse(0, -20, 15, 15);

        this.p5.fill('#9ef4ff');
        this.p5.ellipse(0, -20, 12, 12);

        this.p5.fill('#ffffff');
        this.p5.quad(
          -this._bodyWidth / 2 + 4,
          this._bodyHeight / 2 + this._engineHeight,
          -this._bodyWidth / 2 + 6,
          this._bodyHeight / 2,
          this._bodyWidth / 2 - 6,
          this._bodyHeight / 2,
          this._bodyWidth / 2 - 4,
          this._bodyHeight / 2 + this._engineHeight,
        );
    }

    private drawFumes() {
        this.p5.fill('#ff0000');
        this.p5.ellipse(0, this._bodyHeight / 2 + this._engineHeight, 10, this.p5.map(this.rocket.speed(), 0, this.rocket.maxSpeed(), 0, this.fumesHeight / 3 * Math.random() + this.fumesHeight, true));

        this.p5.fill('#ff8400');
        this.p5.ellipse(0, this._bodyHeight / 2 + this._engineHeight, 8, this.p5.map(this.rocket.speed(), 0, this.rocket.maxSpeed(), 0,  this.fumesHeight / 3 * Math.random() + this.fumesHeight * 2 / 3, true));

        this.p5.fill('#ffe600');
        this.p5.ellipse(0, this._bodyHeight / 2 + this._engineHeight, 6, this.p5.map(this.rocket.speed(), 0, this.rocket.maxSpeed(), 0, this.fumesHeight / 3 * Math.random() + this.fumesHeight / 3, true));


    }
}