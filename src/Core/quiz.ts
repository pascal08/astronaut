import { Question } from './question';

export class Quiz {
    public score: number;
    public readonly finishScore: number;
    private questions: Array<Question>;
    private questionNumber: number;
    public finished = false;
    public givenAnswer: string[];

    constructor(questions: Array<Question>, finishScore: number) {
        this.questions = questions;
        this.questionNumber = 1;
        this.finishScore = finishScore;
        this.score = 0;
        this.givenAnswer = [];
    }

    currentQuestion(): string {
        return this.questions[this.questionNumber - 1].question;
    }

    submitAnswer(): void {
        if (this.finished) {
            return;
        }

        if (this.givenAnswer.length === 0) {
            return;
        }

        if (this.questions[this.questionNumber - 1].answer === this.givenAnswer.join('')) {
            this.score++;
        }

        this.givenAnswer = [];

        if (this.questionNumber >= this.questions.length || this.score >= this.finishScore) {
            this.finished = true;
            return;
        }

        this.questionNumber++;
    }

    addToAnswer(digit: string) {
        if (this.givenAnswer.length >= 2) {
            return;
        }

        this.givenAnswer.push(digit);
    }

    removeFromAnswer() {
        this.givenAnswer.pop();
    }
}