import * as p5 from 'p5';
import { Rocket } from '../../Core/rocket';
import { Drawer } from '../drawer.abstract';

export class RocketDrawer extends Drawer
{
    private p5: p5;
    private rocket: Rocket;

    constructor(rocket: Rocket, p5: p5) {
        super();
        this.rocket = rocket;
        this.p5 = p5;
    }

    draw(): void {
        this.p5.fill('#ffffff');
        this.p5.text(this.rocket._distanceToNearestPlanet, 10, 20);

        this.p5.fill('#ffffff');
        this.p5.text(this.rocket.scale(), 10, 40);

        this.p5.translate(this.rocket.offsetX(), this.rocket.offsetY());
        this.p5.scale(this.rocket.scale());
        this.p5.rotate(this.rocket.angle());

        this.p5.fill('#ffffff');
        // this.p5.arc(0, -25, 25, 50, Math.PI, 2 * Math.PI);
        // this.p5.triangle(-2.5, -48, 2.5, -48, 0, -75);
        // this.p5.circle(0, -70, 3);
        this.p5.triangle(-12.5, -24, 12.5, -24, 0, -50);
        this.p5.rect(-12.5, -26, 25, 50, 3, 3);

        this.p5.fill('#ff0000');
        this.p5.triangle(-12, -10, -12, 20, -25, 30);
        this.p5.triangle(12, -10, 12, 20, 25, 30);

        this.p5.fill('#ff0000');
        this.p5.ellipse(0, -20, 15, 15);

        this.p5.fill('#9ef4ff');
        this.p5.ellipse(0, -20, 12, 12);
    }
}