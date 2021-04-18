import { Question } from '../question';
import { Quiz } from './quiz';

export class QuizFactory {
  static createQuiz(numberOfQuestions: number, finishScore: number): Quiz {
    const questions = [];
    let firstNumber;
    let secondNumber;
    let answer;
    for (let i = 0; i < numberOfQuestions; i++) {
      firstNumber = Math.floor(Math.random() * 10);
      secondNumber = Math.floor(Math.random() * 10);
      answer = firstNumber + secondNumber;
      questions.push(new Question('' + firstNumber + ' + ' + secondNumber + ' = ', '' + answer));
    }

    return new Quiz(questions, finishScore);
  }
}