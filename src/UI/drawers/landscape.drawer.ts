import * as p5 from 'p5';
import { Landscape } from '../../Core/landscape';
import { Drawer } from '../drawer.abstract';

export class LandscapeDrawer extends Drawer {
    private landscape: Landscape;
    private p5: p5.p5InstanceExtensions;

    constructor(landscape: Landscape, p5: p5) {
        super();
        this.landscape = landscape;
        this.p5 = p5;
    }

    draw(): void {
        this.p5.fill('#909090');
        this.p5.ellipse(this.landscape.offsetX, this.landscape.offsetY, this.landscape.width, this.landscape.height);

        for (let i = 0; i < this.landscape.craters.length; i++) {
            this.p5.fill('#555555');
            this.p5.push();
            this.p5.translate(this.landscape.craters[i][0], this.landscape.craters[i][1]);
            this.p5.rotate(this.landscape.craters[i][3]);
            this.p5.ellipse(0, 0, this.landscape.craters[i][2] * 60, this.landscape.craters[i][2] * 20);
            this.p5.fill('#aaaaaa');
            this.p5.ellipse(5, 0, this.landscape.craters[i][2] * 60, this.landscape.craters[i][2] * 20);
            this.p5.pop();
        }
    }
}
