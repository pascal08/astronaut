import { Question } from './question';

export class Quiz
{
    private questions: Array<Question>;
    private questionNumber: number;
    private rightAnswerCallbacks: Array<() => void> = [];
    private falseAnswerCallbacks: Array<() => void> = [];
    public finished: boolean = false;

    constructor(questions: Array<Question>) {
        this.questions = questions;
        this.questionNumber = 1;
    }

    currentQuestion(): string {
        return this.questions[this.questionNumber - 1].question;
    }

    submitAnswer(answer: string): void {
        if (this.correctAnswerToCurrentQuestion() === answer) {
            this.executeRightAnswerCallbacks();
        } else {
            this.executeFalseAnswerCallbacks();
        }

        if (this.questionNumber >= this.questions.length) {
            this.finished = true;
        }
    }

    nextQuestion(): void {
        if (this.finished) {
            return;
        }

        if (this.questionNumber <= this.questions.length + 1) {
            this.questionNumber++;
        }
    }

    onRightAnswer(callback: () => void): void {
        this.rightAnswerCallbacks.push(callback);
    }

    onFalseAnswer(callback: () => void): void {
        this.falseAnswerCallbacks.push(callback);
    }

    private correctAnswerToCurrentQuestion() {
        return this.questions[this.questionNumber - 1].answer;
    }

    private executeRightAnswerCallbacks(): void {
        this.rightAnswerCallbacks.forEach((callback) => callback());
    }

    private executeFalseAnswerCallbacks(): void {
        this.falseAnswerCallbacks.forEach((callback) => callback());
    }
}