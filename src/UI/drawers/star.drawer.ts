import * as p5 from 'p5';
import { Star } from '../star';
import { Drawer } from '../drawer.abstract';
import { Canvas } from '../../Core/canvas';

export class StarDrawer extends Drawer {
    private stars: Array<Star> = [];
    private p5: p5.p5InstanceExtensions;

    constructor(
      canvas: Canvas,
      p5: p5,
    ) {
        super();
        for (let i = 0; i < 250; i++) {
            this.stars.push(
              new Star(
                Math.floor(Math.random() * (canvas.width)),
                Math.floor(Math.random() * (canvas.height)),
                Math.floor(Math.random() * (3 - 2)) + 2,
                Math.floor(Math.random() * (255 - 100)) + 100,
              ),
            );
        }
        this.p5 = p5;
    }

    draw(): void {
        this.p5.noStroke();
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            const scale = star.size + this.p5.sin(star.t);
            star.t += 0.05;
            this.p5.fill(star.hue);
            this.p5.ellipse(star.offsetX, star.offsetY, scale, scale);
        }
    }
}
