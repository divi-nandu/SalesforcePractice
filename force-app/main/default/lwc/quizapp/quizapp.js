import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    myQuestions = [
        {
            id: 'question1',
            question: 'Which one of the following is not a template loop?',
            answers: {
                a: 'for:each',
                b: 'Iterator',
                c: 'Map loop'
            },
            correctAnswer: 'c'
        },
        {
            id: 'question2',
            question: 'Which of the following is an invalid file in an LWC component folder?',
            answers: {
                a: 'HTML',
                b: 'Apex',
                c: 'JavaScript'
            },
            correctAnswer: 'b'
        },
        {
            id: 'question3',
            question: 'Which of the following is not a directive?',
            answers: {
                a: 'for:each',
                b: 'if:true',
                c: '@track'
            },
            correctAnswer: 'c'
        }
    ];

    selected = {};
    correctAnswers = 0;
    isSubmitted = false;
    
    changeHandler(event) {
    const { name, value } = event.target;

    this.selected = {
        ...this.selected,
        [name]: value
    };
}
get allNotSelected() {
    return Object.keys(this.selected).length < this.myQuestions.length;
}
get isScoredFull() {
    return this.correctAnswers === this.myQuestions.length
        ? 'slds-text-color_success'
        : 'slds-text-color_error';
}
submitHandler(event) {
    event.preventDefault();

    const correct = this.myQuestions.filter((quiz) => {
        return this.selected[quiz.id] === quiz.correctAnswer;
    });

    this.correctAnswers = correct.length;
    this.isSubmitted = true;
}

resetHandler() {
    this.selected = {};
    this.correctAnswers = 0;
    this.isSubmitted = false;
}
}