import * as p5 from 'p5';
import { Space } from '../../Core/Space/space';
import { GameState } from '../../Application/game-state';
import { Drawer } from '../drawer.abstract';
import { CanvasOffset } from '../../canvas-offset';
import { Assets } from '../../index';
import { QuizInterface } from '../../Core/Quiz/quiz.interface';

export class QuizDrawer extends Drawer {
    private quiz: QuizInterface;
    private canvas: Space;
    private p5: p5.p5InstanceExtensions;
    private answerInput: null | p5.Element;

    private readonly _fuelTurbulence: number = 10;
    private readonly _fuelTankHeight = 300;
    private readonly _fuelTankWidth = 30;
    private yoff: number = 0;
    private currentFuelLevel: number = 0;
    private assets: Assets;

    constructor(quiz: QuizInterface, p5: p5, canvas: Space, assets: Assets) {
        super();
        this.canvas = canvas;
        this.quiz = quiz;
        this.p5 = p5;
        this.assets = assets;
        this.answerInput = null;
    }

    draw(state: GameState): void {
        this.drawPlanet();
        this.drawFuelBar();
        this.drawQuestion();
        this.drawGivenAnswer();
    }

    private drawFuelBar(): void {
        this.drawFuelTank();
        this.drawFuel();
    }

    private drawFuelTank(): void {
        this.p5.stroke(50);
        this.p5.strokeWeight(4);
        this.p5.fill(255, 255, 255);
        this.p5.rect(50 - 2, 50 - 2, 30 + 4, this._fuelTankHeight + 4);
    }

    private drawFuel(): void {
        let quiz = GameState.getInstance().quiz;

        const canvasOffset = new CanvasOffset(50, (this.canvas.height - this._fuelTankHeight) / 2);

        this.p5.strokeWeight(1);
        this.p5.fill(255, 204, 0, 155);


        let xoff = 0;
        const newFuelLevel = this._fuelTankHeight * quiz.percentageCompleted() + 0.1 * this._fuelTankHeight;
        if (this.currentFuelLevel > newFuelLevel) {
            this.currentFuelLevel = 0;
        }
        if (this.currentFuelLevel < newFuelLevel) {
            this.currentFuelLevel += 2;
        }
        const minFuelLevel = this.currentFuelLevel - this._fuelTurbulence;
        const maxFuelLevel = this.currentFuelLevel + this._fuelTurbulence;
        let yExcess = 0;
        let waveCoordinates: Array<{x: number, y: number}> = [];
        let stepSize = 10;
        for (let x = 0; x <= this._fuelTankWidth; x += stepSize) {
            let noise = this.p5.noise(xoff, this.yoff);
            let y = this.p5.map(noise, 0, 1, minFuelLevel, maxFuelLevel);
            if (y > this._fuelTankHeight) {
                y = this._fuelTankHeight;
            }
            if (y < 0) {
                y = 0;
            }
            yExcess += y - this.currentFuelLevel;
            waveCoordinates.push({x, y, })
            xoff += 0.15;
        }
        let yAverageExcess = yExcess / (this._fuelTankWidth / stepSize);
        this.yoff += 0.01;

        this.p5.beginShape();
        for (const waveCoordinate of waveCoordinates) {
            this.p5.vertex(
              canvasOffset.offsetX + waveCoordinate.x,
              canvasOffset.offsetY + this._fuelTankHeight - waveCoordinate.y + yAverageExcess
            );
        }
        this.p5.vertex(
          canvasOffset.offsetX + this._fuelTankWidth,
          canvasOffset.offsetY + this._fuelTankHeight
        );
        this.p5.vertex(
          canvasOffset.offsetX,
          canvasOffset.offsetY + this._fuelTankHeight
        );
        this.p5.endShape(this.p5.CLOSE);
    }

    private drawQuestion(): void {
        let quiz = GameState.getInstance().quiz;

        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('center');
        this.p5.text(quiz.currentQuestion(), this.canvas.width / 2, this.canvas.height / 2);
    }

    private drawGivenAnswer(): void {
        let quiz = GameState.getInstance().quiz;

        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('left');
        this.p5.text(quiz.givenAnswer(), this.canvas.width / 2 + 100, this.canvas.height / 2);
    }

    private drawPlanet() {
        let state = GameState.getInstance();

        if (!state.onPlanet) {
            return;
        }
        let image = this.assets.images[state.onPlanet.name];
        let width = image.width / 2;
        let height = image.height / 2;
        this.p5.image(
          image,
          0 - width / 2 + this.canvas.width / 2,
          0 - height / 2 + this.canvas.height + height / 2 * 0.6,
          width,
          height,
        );
    }
}
