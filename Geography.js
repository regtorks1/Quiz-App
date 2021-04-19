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
        question: 'Which mountain is the tallest in Japan?',
        choice1: 'Mount Fuji',
        choice2: 'Mountain Kilimanjaro',
        choice3: 'Mount Rainier',
        choice4: 'Mount Everest',
        answer: 1,
    },
    {
        question: "The largest rainforest in the world is?",
        choice1: "The Serengeti",
        choice2: "Yellowstone",
        choice3: "Atiwa forest",
        choice4: "The Amazon",
        answer: 4,
    },
    {
        question: " The largest lake in Africa is?",
        choice1: "Lake Volta",
        choice2: "Lake Huron",
        choice3: "Lake Ontario",
        choice4: "Lake Victoria",
        answer: 4,
    },
    {
        question: " The longest range of mountains in Europe is?",
        choice1: "The Alps",
        choice2: "The Apalachian Mountains",
        choice3: "Himalayas",
        choice4: "Akwamu range",
        answer: 1,
    },
    {
        question: " What is the capital of Cote d'Ivoire?",
        choice1: "Abidjan",
        choice2: "Ibadan",
        choice3: "Yamosoukro",
        choice4: "Niamey",
        answer: 3,
    },
];

//constants
const Correct_Bonus = 20;
const Max_Questions = 5;

startGeography = () => {
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
    progressText.innerText = `Question ${questionCounter}/${Max_Questions}`;
    //Update progress bar
    progressBarFull.style.width = `${(questionCounter / Max_Questions) * 100}%`;

   const questionIndex = Math.floor(Math.random()* availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;

   choices.forEach( choice => {
       const number = choice.dataset['number'];
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
       const selectedAnswer = selectedChoice.dataset["number"];

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

startGeography();



