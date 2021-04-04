import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';
import { Canvas } from '../../Core/canvas';

export class LandscapeDrawer extends Drawer {
    private p5: p5.p5InstanceExtensions;

    private readonly _landScapeOffsetX: number;
    private readonly _landScapeOffsetY: number;
    private readonly _landScapeWidth: number;
    private readonly _landScapeHeight: number;
    private readonly craters: Array<Array<number>>;

    constructor(canvas: Canvas, p5: p5) {
        super();
        this._landScapeOffsetX = canvas.width / 2;
        this._landScapeOffsetY = canvas.height;
        this._landScapeWidth = canvas.width * 1.5;
        this._landScapeHeight = 200;
        this.p5 = p5;
        this.craters = this.createCraters();
    }

    private createCraters(): Array<Array<number>> {
        let offsetX;
        let craters: Array<Array<number>> = [];

        offsetX = -250;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 20, 0.7, offsetX / 10000 * Math.PI]);
        offsetX = -180;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 30, 0.9, offsetX / 10000 * Math.PI]);
        offsetX = -100;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 70, 0.6, offsetX / 10000 * Math.PI]);
        offsetX = -70;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 25, 0.8, offsetX / 10000 * Math.PI]);
        offsetX = 20;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 50, 0.7, offsetX / 10000 * Math.PI]);
        offsetX = 40;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 5, 0.9, offsetX / 10000 * Math.PI]);
        offsetX = 120;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 25, 0.8, offsetX / 10000 * Math.PI]);
        offsetX = 150;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 70, 0.8, offsetX / 10000 * Math.PI]);
        offsetX = 250;
        craters.push([this._landScapeOffsetX + offsetX, this._landScapeOffsetY - 30, 0.9, offsetX / 10000 * Math.PI]);

        return craters;
    }

    draw(): void {
        this.p5.fill('#909090');
        this.p5.ellipse(this._landScapeOffsetX, this._landScapeOffsetY, this._landScapeWidth, this._landScapeHeight);

        for (let i = 0; i < this.craters.length; i++) {
            this.p5.fill('#555555');
            this.p5.push();
            this.p5.translate(this.craters[i][0], this.craters[i][1]);
            this.p5.rotate(this.craters[i][3]);
            this.p5.ellipse(0, 0, this.craters[i][2] * 60, this.craters[i][2] * 20);
            this.p5.fill('#aaaaaa');
            this.p5.ellipse(5, 0, this.craters[i][2] * 60, this.craters[i][2] * 20);
            this.p5.pop();
        }
    }
}
