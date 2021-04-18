import { QuizInterface } from './quiz.interface';
import { ObservableInterface } from '../observable.interface';
import { ObserverInterface } from '../observer.interface';
import { Observable } from '../observable';

export class ObservableQuiz implements QuizInterface, ObservableInterface {
    private quiz: QuizInterface;
    private observable: Observable;

    constructor(
        quiz: QuizInterface
    ) {
        this.quiz = quiz;
        this.observable = new Observable();
    }

    currentQuestion(): string {
        return this.quiz.currentQuestion();
    }

    submitAnswer(): void {
        this.quiz.submitAnswer();

        if (this.isFinished()) {
            this.publish();
        }
    }

    addToAnswer(digit: string): void {
        this.quiz.addToAnswer(digit);
    }

    removeFromAnswer():void {
        this.quiz.removeFromAnswer();
    }

    start(): void {
        this.quiz.start();
    }

    isStarted(): boolean {
        return this.quiz.isStarted();
    }

    isFinished(): boolean {
        return this.quiz.isFinished();
    }

    percentageCompleted(): number {
        return this.quiz.percentageCompleted();
    }

    givenAnswer(): string {
        return this.quiz.givenAnswer();
    }

    publish(): void {
        this.observable.publish();
    }

    subscribe(observer: ObserverInterface): void {
        this.observable.subscribe(observer);
    }

    unsubscribe(observer: ObserverInterface): void {
        this.observable.unsubscribe(observer);
    }
}