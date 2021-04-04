import { FuelTank } from '../../Core/fuel-tank';
import { CanvasOffset } from '../../canvas-offset';
import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';

export class FuelTankDrawer extends Drawer {
    private fuelTank: FuelTank;
    private canvasOffset: CanvasOffset;
    private yoff: number;
    private p5: p5;

    constructor(fuelTank: FuelTank, canvasOffset: CanvasOffset, p5: p5) {
        super();
        this.fuelTank = fuelTank;
        this.canvasOffset = canvasOffset;
        this.yoff = 0;
        this.p5 = p5;
    }

    draw(): void {
    }

}