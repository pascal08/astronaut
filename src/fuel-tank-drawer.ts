import { FuelTank } from './fuel-tank';
import { CanvasOffset } from './canvas-offset';
import * as p5 from 'p5';

export class FuelTankDrawer
{
    private fuelTank: FuelTank;
    private canvasOffset: CanvasOffset;
    private yoff: number;
    private p5: p5;
    constructor(fuelTank: FuelTank, canvasOffset: CanvasOffset, p5: p5) {
        this.fuelTank = fuelTank;
        this.canvasOffset = canvasOffset;
        this.yoff = 0;
        this.p5 = p5;
    }

    draw() {
        this.drawFuelTank();
        this.drawFuel();
    }

    drawFuelTank() {
        this.p5.stroke(50);
        this.p5.strokeWeight(4);
        this.p5.fill(255, 255, 255);
        this.p5.rect(this.canvasOffset.offsetX, this.canvasOffset.offsetY, this.fuelTank.width, this.fuelTank.height);
    }

    drawFuel() {
        this.p5.strokeWeight(1);
        this.p5.fill(255, 204, 0, 155);
        this.p5.beginShape();
        let xoff = this.yoff;
        let averageFuelLevel = this.fuelTank.height - this.fuelTank.height / this.fuelTank.maxFuelLevel * this.fuelTank.fuelLevel;
        let minFuelLevel = averageFuelLevel - this.fuelTank.fuelTurbulence;
        let maxFuelLevel = averageFuelLevel + this.fuelTank.fuelTurbulence;
        for (let x = 0; x <= this.fuelTank.width; x += 10) {
            let y = this.p5.map(this.p5.noise(xoff, this.yoff), 0, 1, minFuelLevel, maxFuelLevel);
            if (y > this.fuelTank.height) {
                y = this.fuelTank.height;
            }
            if (y < 0) {
                y = 0;
            }
            this.p5.vertex(this.canvasOffset.offsetX + x, this.canvasOffset.offsetY + y);
            xoff += 0.05;
        }
        this.yoff += 0.01;
        this.p5.vertex(this.canvasOffset.offsetX + this.fuelTank.width, this.canvasOffset.offsetY + this.fuelTank.height);
        this.p5.vertex(this.canvasOffset.offsetX, this.canvasOffset.offsetY + this.fuelTank.height);
        this.p5.endShape(this.p5.CLOSE);
    }
}