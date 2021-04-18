import { Question } from './question';
import { QuizInterface } from './quiz.interface';

export class Quiz implements QuizInterface {
    public score: number;
    public readonly finishScore: number;
    private questions: Array<Question>;
    private questionNumber: number;
    private _isFinished = false;
    private _isStarted = false;
    private _givenAnswer: string[];

    constructor(questions: Array<Question>, finishScore: number) {
        this.questions = questions;
        this.questionNumber = 1;
        this.finishScore = finishScore;
        this.score = 0;
        this._givenAnswer = [];
    }

    currentQuestion(): string {
        return this.questions[this.questionNumber - 1].question;
    }

    submitAnswer(): void {
        if (this._isFinished) {
            return;
        }
        if (this._givenAnswer.length === 0) {
            return;
        }
        if (!this._isStarted) {
            this._isStarted = true;
        }

        if (this.questions[this.questionNumber - 1].answer === this._givenAnswer.join('')) {
            this.score++;
        }

        this._givenAnswer = [];

        if (this.questionNumber >= this.questions.length || this.score >= this.finishScore) {
            this._isFinished = true;
            return;
        }

        this.questionNumber++;
    }

    addToAnswer(digit: string) {
        if (this._givenAnswer.length >= 2) {
            return;
        }

        this._givenAnswer.push(digit);
    }

    removeFromAnswer() {
        this._givenAnswer.pop();
    }

    start(): void {
        this._isStarted = true;
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    isStarted(): boolean {
        return this._isStarted;
    }

    percentageCompleted(): number {
        return this.score / this.finishScore;
    }

    givenAnswer(): string {
        return this._givenAnswer.join('');
    }

}