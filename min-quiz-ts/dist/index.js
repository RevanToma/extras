"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_readline_1 = __importDefault(require("node:readline"));
console.log('Hej från Typescript!');
const questions = [
    {
        question: 'Vad är 1+1?',
        answer: 2,
        help: 'Det är samma som 1*2',
    },
    {
        question: 'Vad är Sveriges huvudstad?',
        answer: 'Stockholm',
        help: 'Det är också Sveriges största stad',
    },
];
let score = 0;
const checkAnswer = (q, userAnswer) => {
    if (userAnswer.toString().toLowerCase() === q.answer.toString().toLowerCase()) {
        console.log('Rätt svar!');
        score++;
    }
    else {
        console.log(`Fel svar! Rätt svar är ${q.answer}`);
    }
};
// Fråga användaren och returnera svaret som Promise<string>
function ask(rl, prompt) {
    return new Promise((resolve) => rl.question(prompt + ' ', resolve));
}
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// rl.question('Vad heter du? ', (answer: string) => {
//   console.log('Hej ' + answer);
//   rl.close();
// });
// const main = async () => {
//   const name = await ask(rl, 'Vad heter du?');
//   console.log(`Hej ${name}`);
//   const age = await ask(rl, questions[1]);
//   console.log(`Du är ${age} år gammal`);
//   rl.close();
// };
async function getUserAnswerWithHelp(q, rl) {
    let userAnswer = await ask(rl, `${q.question} (Skriv 'hjälp' för tips)`);
    if (userAnswer.trim().toLowerCase() === 'hjälp' && q.help) {
        console.log('Tips:', q.help);
        userAnswer = await ask(rl, q.question);
    }
    return userAnswer;
}
const main = async () => {
    const name = await ask(rl, 'Vad heter du?');
    console.log(`Hej ${name}`);
    for (const q of questions) {
        const userAnswer = await getUserAnswerWithHelp(q, rl);
        checkAnswer(q, userAnswer);
    }
    console.log(`Du fick ${score} poäng av ${questions.length}`);
    rl.close();
};
main();
