import { Quiz } from './quiz';
import * as p5 from 'p5';

export class QuizDrawer
{
    private quiz: Quiz;
    private p5: p5.p5InstanceExtensions;
    private answerInput: null|p5.Element;

    constructor(quiz: Quiz, p5: p5) {
        this.quiz = quiz;
        this.p5 = p5;
        this.answerInput = null;
    }

    draw(globals: any, canvasWidth: number, canvasHeight: number) {
        this.drawQuestion(canvasWidth, canvasHeight);
        this.drawGivenAnswer(canvasWidth, canvasHeight, globals);
    }

    drawQuestion(canvasWidth: number, canvasHeight: number) {
        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('center');
        this.p5.text(this.quiz.currentQuestion(), canvasWidth / 2, canvasHeight / 2);
    }

    drawGivenAnswer(canvasWidth: number, canvasHeight: number, globals: any) {
        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('left');
        this.p5.text(globals.givenAnswer.join(''), canvasWidth / 2 + 100, canvasHeight / 2);
    }
}
