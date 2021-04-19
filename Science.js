const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [ 
    {
        question: 'What is the smallest particle in the Universe?',
        choice1: 'Germ',
        choice2: 'Atom',
        choice3: 'Amoeba',
        choice4: 'Photon',
        answer: 2,
    },
    {
        question: "The largest planet in the Solar System is?",
        choice1: "Jupiter",
        choice2: "Saturn",
        choice3: "Sun",
        choice4: "Uranus",
        answer: 1,
    },
    {
        question: " What is the equation for relativity?",
        choice1: "E = mc^2",
        choice2: "F = ma",
        choice3: "V = IR",
        choice4: "infinity",
        answer: 1,
    },
    {
        question: " Who invented the light bulb?",
        choice1: "Thomas Edison",
        choice2: "Albert Einstein",
        choice3: "Leornardo Da Vinci",
        choice4: "Steve Jobs",
        answer: 1,
    },
    {
        question: " Who invented Windows OS?",
        choice1: "Steve Jobs",
        choice2: "Elon Musk",
        choice3: "Bill Gates",
        choice4: "Bob Marley",
        answer: 3,
    },
];

//constants
const Correct_Bonus = 20;
const Max_Questions = 5;

startScience = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
    
};


    getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
            localStorage.setItem("mostRecentScore", score);
            //go to the end page
            return window.location.assign('./endQuiz.html');
        }
    questionCounter++;
    progressText.innerText = `${questionCounter}/${Max_Questions}`;
    //Update progress bar
    progressBarFull.style.width = `${(questionCounter / Max_Questions) * 100}%`;

   const questionIndex = Math.floor(Math.random()* availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;

   choices.forEach( choice => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion['choice' + number];
   });
   availableQuestions.splice(questionIndex, 1);
   acceptingAnswers = true;
};

choices.forEach((choice) => {
   choice.addEventListener('click', (e) => {
       if (!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];

       const classToApply = 
       selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

       if (classToApply === "correct") {
        incrementScore(Correct_Bonus);
      }

       selectedChoice.parentElement.classList.add(classToApply);

       setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply); 

       getNewQuestion();
       }, 1000);
   });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startScience();



