import { Question } from './question';

export class Quiz
{
    private questions: Array<Question>;
    private questionNumber: number;
    constructor(questions: Array<Question>) {
        this.questions = questions;
        this.questionNumber = 1;
    }

    currentQuestion() {
        return this.questions[this.questionNumber - 1].question;
    }

    correctAnswerToCurrentQuestion() {
        return this.questions[this.questionNumber - 1].answer;
    }

    isCorrectAnswer(answer: string) {
        return this.correctAnswerToCurrentQuestion() === answer;
    }

    nextQuestion() {
        if (this.questions.length + 1 > this.questionNumber - 1) {
            this.questionNumber++;
        }
    }
}