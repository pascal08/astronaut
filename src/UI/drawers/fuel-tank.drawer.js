var FuelTankDrawer = (function () {
    function FuelTankDrawer(fuelTank, canvasOffset, p5) {
        this.fuelTank = fuelTank;
        this.canvasOffset = canvasOffset;
        this.yoff = 0;
        this.p5 = p5;
    }
    FuelTankDrawer.prototype.draw = function () {
        this.drawFuelTank();
        this.drawFuel();
    };
    FuelTankDrawer.prototype.drawFuelTank = function () {
        this.p5.stroke(50);
        this.p5.strokeWeight(4);
        this.p5.fill(255, 255, 255);
        this.p5.rect(this.canvasOffset.offsetX, this.canvasOffset.offsetY, this.fuelTank.width, this.fuelTank.height);
    };
    FuelTankDrawer.prototype.drawFuel = function () {
        this.p5.strokeWeight(1);
        this.p5.fill(255, 204, 0, 155);
        this.p5.beginShape();
        var xoff = this.yoff;
        var averageFuelLevel = this.fuelTank.height - this.fuelTank.height / this.fuelTank.maxFuelLevel * this.fuelTank.fuelLevel;
        var minFuelLevel = averageFuelLevel - this.fuelTank.fuelTurbulence;
        var maxFuelLevel = averageFuelLevel + this.fuelTank.fuelTurbulence;
        for (var x = 0; x <= this.fuelTank.width; x += 10) {
            var y = this.p5.map(this.p5.noise(xoff, this.yoff), 0, 1, minFuelLevel, maxFuelLevel);
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
    };
    return FuelTankDrawer;
}());
export { FuelTankDrawer };
//# sourceMappingURL=src/fuel-tank-drawer.js.map