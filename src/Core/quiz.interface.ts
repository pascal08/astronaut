export interface QuizInterface {
  isStarted(): boolean;

  isFinished(): boolean;

  currentQuestion(): string;

  submitAnswer(): void;

  addToAnswer(digit: string): void;

  removeFromAnswer(): void;

  percentageCompleted(): number;

  givenAnswer(): string;

  start(): void;
}