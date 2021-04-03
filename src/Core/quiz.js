var Quiz = (function () {
    function Quiz(questions) {
        this.questions = questions;
        this.questionNumber = 1;
    }
    Quiz.prototype.currentQuestion = function () {
        return this.questions[this.questionNumber - 1].question;
    };
    Quiz.prototype.correctAnswerToCurrentQuestion = function () {
        return this.questions[this.questionNumber - 1].answer;
    };
    Quiz.prototype.submitAnswer = function (answer) {
        return this.correctAnswerToCurrentQuestion() === answer;
    };
    Quiz.prototype.nextQuestion = function () {
        if (this.questions.length + 1 > this.questionNumber - 1) {
            this.questionNumber++;
        }
    };
    return Quiz;
}());
export { Quiz };
//# sourceMappingURL=src/quiz.js.map