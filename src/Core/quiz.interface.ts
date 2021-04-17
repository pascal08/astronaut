export interface QuizInterface {
  isFinished(): boolean;

  currentQuestion(): string;

  submitAnswer(): void;

  addToAnswer(digit: string): void;

  removeFromAnswer(): void;

  percentageCompleted(): number;

  givenAnswer(): string;
}