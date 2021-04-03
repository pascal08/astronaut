var FuelTank = (function () {
    function FuelTank(width, height, maxFuelLevel, initialFuelLevel, fuelTurbulence) {
        if (maxFuelLevel === void 0) { maxFuelLevel = 25; }
        if (initialFuelLevel === void 0) { initialFuelLevel = 1; }
        if (fuelTurbulence === void 0) { fuelTurbulence = 25; }
        this.width = width;
        this.height = height;
        this.maxFuelLevel = maxFuelLevel;
        this.fuelLevel = initialFuelLevel;
        this.fuelTurbulence = fuelTurbulence;
    }
    FuelTank.prototype.addFuel = function () {
        if (this.fuelLevel < this.maxFuelLevel) {
            this.fuelLevel++;
        }
    };
    FuelTank.prototype.removeFuel = function () {
        if (this.fuelLevel > 1) {
            this.fuelLevel--;
        }
    };
    return FuelTank;
}());
export { FuelTank };
//# sourceMappingURL=src/fuel-tank.js.map