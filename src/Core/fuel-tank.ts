export class FuelTank
{
    public readonly width: number;
    public readonly height: number;
    public readonly maxFuelLevel: number;
    public fuelLevel: number;
    public readonly fuelTurbulence: number;

    constructor(
      width: number, // ToDo: move to FuelTankDrawer
      height: number,  // ToDo: move to FuelTankDrawer
      maxFuelLevel = 25,
      initialFuelLevel = 0,
      fuelTurbulence = 25 // ToDo: move to FuelTankDrawer
    ) {
        this.width = width;
        this.height = height;
        this.maxFuelLevel = maxFuelLevel;
        this.fuelLevel = initialFuelLevel;
        this.fuelTurbulence = fuelTurbulence;
    }

    addFuel(): void {
        if (this.fuelLevel < this.maxFuelLevel) {
            this.fuelLevel++;
        }
    }

    removeFuel(): void {
        if (this.fuelLevel > 1) {
            this.fuelLevel--;
        }
    }
}
