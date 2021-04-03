import { FuelTank } from '../Core/fuel-tank';
import { CanvasOffset } from '../canvas-offset';
import * as p5 from 'p5';
import { Rocket } from '../Core/rocket';

export class RocketDrawer
{
    private p5: p5;
    private rocket: Rocket;

    constructor(rocket: Rocket, p5: p5) {
        this.rocket = rocket;
        this.p5 = p5;
    }

    draw(): void {
        let o = 255;
        let s = 1;

        this.p5.translate(this.rocket.offsetX(), this.rocket.offsetY());
        this.p5.scale(s);
        this.p5.rotate(this.rocket.angle());
        this.p5.fill(100, o);
        this.p5.triangle(-12.5, -24, 12.5, -24, 0, -50);
        this.p5.rect(-12.5, -26, 25, 50, 3, 3);
        this.p5.fill(0, 100, 100, o);
        this.p5.triangle(-12, -10, -12, 20, -25, 30);
        this.p5.triangle(12, -10, 12, 20, 25, 30);
        this.p5.fill(50, 255, 255, o);
        this.p5.ellipse(0, -15, 15, 15);
    }
}