import { Interface } from 'readline';
import readline from 'node:readline';

console.log('Hej från Typescript!');

type Questions = {
  question: string;
  answer: string | number;
  help?: string;
};
const questions: Questions[] = [
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
// Fråga användaren och returnera svaret som Promise<string>
function ask(rl: readline.Interface, prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt + ' ', resolve));
}

let score = 0;
const checkAnswer = (q: Questions, userAnswer: string) => {
  if (
    userAnswer.toString().toLowerCase() === q.answer.toString().toLowerCase()
  ) {
    console.log('Rätt svar!');
    score++;
  } else {
    console.log(`Fel svar! Rätt svar är ${q.answer}`);
  }
};

const rl: Interface = readline.createInterface({
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

async function getUserAnswerWithHelp(
  q: Questions,
  rl: readline.Interface
): Promise<string> {
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

  console.log(`Du fick ${score} av ${questions.length} poäng`);
  rl.close();
};

main();
