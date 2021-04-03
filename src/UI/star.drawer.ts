import * as p5 from 'p5';
import { Star } from '../Core/star';

export class StarDrawer
{
    private stars: Array<Star>;
    private p5: p5.p5InstanceExtensions;

    constructor(stars: Array<Star>, p5: p5) {
        this.stars = stars;
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
