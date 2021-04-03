import { Quiz } from '../../Core/quiz';
import * as p5 from 'p5';
import { Canvas } from '../../Core/canvas';
import { GameState } from '../../Application/game.state';
import { Drawer } from '../drawer.abstract';

export class QuizDrawer extends Drawer
{
    private quiz: Quiz;
    private canvas: Canvas;
    private p5: p5.p5InstanceExtensions;
    private answerInput: null|p5.Element;

    constructor(quiz: Quiz, p5: p5, canvas: Canvas) {
        super();
        this.canvas = canvas;
        this.quiz = quiz;
        this.p5 = p5;
        this.answerInput = null;
    }

    draw(state: GameState): void {
        this.drawQuestion();
        this.drawGivenAnswer(state);
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
        this.p5.text(state.givenAnswer.join(''), this.canvas.width / 2 + 100, this.canvas.height / 2);
    }
}
