export class Question
{
    public readonly question: string;
    public readonly answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }
}