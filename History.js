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
        question: 'Who is the first President of Ghana?',
        choice1: 'Kwame Nkrumah',
        choice2: 'Edward Akuffo Addo',
        choice3: 'J.A Kuffour',
        choice4: 'Dr.Hilla Liman',
        answer: 1,
    },
    {
        question: "Who were the first European to land in Ghana?",
        choice1: "The Dutch",
        choice2: "The French",
        choice3: "The English",
        choice4: "The Portuguese",
        answer: 4,
    },
    {
        question: " Who was the head of the Nazi's during World war 2?",
        choice1: "Napoleon Bonaparte",
        choice2: "Joseph Stalin",
        choice3: "Adolf Hitler",
        choice4: "Woodrow Wilson",
        answer: 3,
    },
    {
        question: " In what year did Ghana gain its independence?",
        choice1: "1956",
        choice2: "1965",
        choice3: "1957",
        choice4: "1951",
        answer: 3,
    },
    {
        question: " Which President was able to pass the abolishment of slavery into law in America?",
        choice1: "Abraham Lincoln",
        choice2: "George Washington",
        choice3: "Franklin Delano Roosevelt",
        choice4: "Woodrow Wilson",
        answer: 1,
    },
];

//constants
const Correct_Bonus = 20;
const Max_Questions = 5;

startHistory = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
    
};


    getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
            localStorage.setItem("mostRecentScore",score)
            //go to the end page
            return window.location.assign('./endQuiz.html');
        }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${Max_Questions}`
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
       const selectedAnswer = selectedChoice.dataset['number'];

       const classToApply = 
           selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

           if(classToApply == "correct"){
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

startHistory();



