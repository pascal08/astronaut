export class FuelTank
{
    public readonly width: number;
    public readonly height: number;
    public readonly maxFuelLevel: number;
    public fuelLevel: number;
    public readonly fuelTurbulence: number;

    constructor(
      width: number,
      height: number,
      maxFuelLevel = 25,
      initialFuelLevel = 1,
      fuelTurbulence = 25
    ) {
        this.width = width;
        this.height = height;
        this.maxFuelLevel = maxFuelLevel;
        this.fuelLevel = initialFuelLevel;
        this.fuelTurbulence = fuelTurbulence;
    }

    addFuel() {
        if (this.fuelLevel < this.maxFuelLevel) {
            this.fuelLevel++;
        }
    }

    removeFuel() {
        if (this.fuelLevel > 1) {
            this.fuelLevel--;
        }
    }
}
