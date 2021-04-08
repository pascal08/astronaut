import { Quiz } from '../../Core/quiz';
import * as p5 from 'p5';
import { Canvas } from '../../Core/canvas';
import { GameState } from '../../Application/game-state';
import { Drawer } from '../drawer.abstract';
import { CanvasOffset } from '../../canvas-offset';
import { Assets } from '../../index';

export class QuizDrawer extends Drawer
{
    private quiz: Quiz;
    private canvas: Canvas;
    private p5: p5.p5InstanceExtensions;
    private answerInput: null|p5.Element;

    private readonly _fuelTurbulence: number = 25;
    private readonly _fuelTankHeight = 300;
    private readonly _fuelTankWidth = 30;
    private yoff: number = 0;
    private assets: Assets;

    constructor(quiz: Quiz, p5: p5, canvas: Canvas, assets: Assets) {
        super();
        this.canvas = canvas;
        this.quiz = quiz;
        this.p5 = p5;
        this.assets = assets;
        this.answerInput = null;
    }

    draw(state: GameState): void {
        this.drawPlanet(state);
        this.drawFuelBar();
        this.drawQuestion();
        this.drawGivenAnswer(state);
    }

    private drawFuelBar(): void {
        this.drawFuelTank();
        this.drawFuel();
    }

    private drawFuelTank(): void {
        this.p5.stroke(50);
        this.p5.strokeWeight(4);
        this.p5.fill(255, 255, 255);
        this.p5.rect(50, 50, 30, this._fuelTankHeight);
    }

    private drawFuel(): void {
        const canvasOffset = new CanvasOffset(50, (this.canvas.height - this._fuelTankHeight) / 2);

        this.p5.strokeWeight(1);
        this.p5.fill(255, 204, 0, 155);
        this.p5.beginShape();
        let xoff = 0;
        const averageFuelLevel = this._fuelTankHeight - this._fuelTankHeight / this.quiz.finishScore * this.quiz.score;
        const minFuelLevel = averageFuelLevel - this._fuelTurbulence;
        const maxFuelLevel = averageFuelLevel + this._fuelTurbulence;
        for (let x = 0; x <= this._fuelTankWidth; x += 10) {
            let y = this.p5.map(this.p5.noise(xoff, this.yoff), 0, 1, minFuelLevel, maxFuelLevel);
            if (y > this._fuelTankHeight) {
                y = this._fuelTankHeight;
            }
            if (y < 0) {
                y = 0;
            }
            this.p5.vertex(canvasOffset.offsetX + x, canvasOffset.offsetY + y);
            xoff += 0.05;
        }
        this.yoff += 0.01;
        this.p5.vertex(canvasOffset.offsetX + this._fuelTankWidth, canvasOffset.offsetY + this._fuelTankHeight);
        this.p5.vertex(canvasOffset.offsetX, canvasOffset.offsetY + this._fuelTankHeight);
        this.p5.endShape(this.p5.CLOSE);
    }

    private drawQuestion(): void {
        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('center');
        this.p5.text(this.quiz.currentQuestion(), this.canvas.width / 2, this.canvas.height / 2);
    }

    private drawGivenAnswer(state: GameState): void {
        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('left');
        this.p5.text(state.quiz.givenAnswer.join(''), this.canvas.width / 2 + 100, this.canvas.height / 2);
    }

    private drawPlanet(state: GameState) {
        if (!state.currentPlanet) {
            return;
        }
        let image = this.assets.images[state.currentPlanet.name];
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
