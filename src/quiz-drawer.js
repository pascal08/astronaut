var QuizDrawer = (function () {
    function QuizDrawer(quiz, p5) {
        this.quiz = quiz;
        this.p5 = p5;
    }
    QuizDrawer.prototype.draw = function (nextQuestion, canvasWidth, canvasHeight, answerInput) {
        this.drawQuestion(canvasWidth, canvasHeight);
        if (nextQuestion) {
            nextQuestion = false;
            this.drawAnswerInput(answerInput);
        }
    };
    QuizDrawer.prototype.drawQuestion = function (canvasWidth, canvasHeight) {
        this.p5.strokeWeight(4);
        this.p5.fill('white');
        this.p5.textSize(50);
        this.p5.textAlign('center');
        this.p5.text(this.quiz.currentQuestion(), canvasWidth / 2, canvasHeight / 2);
    };
    QuizDrawer.prototype.drawAnswerInput = function (answerInput) {
        if (answerInput) {
            answerInput.remove();
        }
        answerInput = this.p5.createInput();
        answerInput.style('font-size', '50px');
        answerInput.style('font-family', 'Arial, Helvetica, sans-serif');
        answerInput.style('font-style', 'Font Style Normal');
        answerInput.style('color', '#FFF');
        answerInput.style('background', 'none');
        answerInput.style('outline', 'none');
        answerInput.style('border', 'none');
        answerInput.style('width', '100px');
        answerInput.position(385, 155);
        answerInput.elt.focus();
    };
    return QuizDrawer;
}());
export { QuizDrawer };
//# sourceMappingURL=src/quiz-drawer.js.map