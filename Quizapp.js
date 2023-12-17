


const countdown =  document.querySelector(".countdown");
const hearts = document.querySelectorAll("#heart")
const steps = document.querySelectorAll(".steps");
const score = document.querySelector(".score");
const exit = document.querySelector(".cut");
const options = document.querySelectorAll(".options");
const nextBtn = document.querySelector(".nextBtn") 
const questions = document.querySelector(".question");
const main = document.querySelector(".main");
const headLine = document.querySelector(".headLine");
const quizContainer = document.querySelector(".inner-main");

// adding questions and their answers to the objects.

const programmingQuestions = [
  {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High-level Text Management ''", "Hyperlink and Text Markup ''", "Home Tool Markup Language"],
      correctAnswer: "Hyper Text Markup Language"
  },

  {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Java", "Python", "JavaScript", "C++"],
      correctAnswer: "JavaScript"
  },

  {
      question: "What is the purpose of CSS in web development?",
      options: ["To create dynamic content", "To structure and style web pages", "To handle server-side logic", "To manage databases"],
      correctAnswer: "To structure and style web pages"
  },

  {
      question: "Which of the following is a version control system commonly used in software development?",
      options: ["Git", "SVN", "Mercurial", "All of the above"],
      correctAnswer: "All of the above"
  },

  {
    question: "What does JS stand for?",
    options: ["Java Script", "Just Script", "JavaScript", "JungleScript"],
    correctAnswer: "JavaScript",
  },
];
// if user wants to exit the quiz game 
function exitGame(){
    exit.addEventListener("click", () => {
       main.style.display = "none";
       headLine.style.display = "none";
    })
}
exitGame();

let currentQuizIndex = 0;

function loadQuestions(quizIndex){
    questions.textContent = programmingQuestions[quizIndex].question;
    options.forEach(function(option,allOption){
    option.textContent = programmingQuestions[quizIndex].options[allOption];
    })
}
loadQuestions(currentQuizIndex);


function justifyQuestions() {
  options.forEach(function (option) {
    option.addEventListener("click", (isBtn) => {
      const selectedOption = programmingQuestions[currentQuizIndex].options.indexOf(isBtn.target.textContent);

      if (selectedOption === programmingQuestions[currentQuizIndex].options.indexOf(programmingQuestions[currentQuizIndex].correctAnswer)) {
        option.style.backgroundColor = "green";
        questionsUpdater(currentQuizIndex + 1);
      } else {
        if (heartsOccured) {
          option.style.backgroundColor = "red";
          updateHearts(index);
          index++;

          // Disable pointer events only for the clicked wrong option
          isBtn.target.style.pointerEvents = "none";

          if (index >= hearts.length) {
            gameOver();
          }

        
        }
      }
    });
  });
}

let heartsOccured = true;

justifyQuestions();

function questionsUpdater(update) {
  nextBtn.addEventListener("click", () => {
    const selectedOption = Array.from(options).find((option) => option.style.backgroundColor === "green");
   
    if (selectedOption) {

      quizContainerTransition();
      setTimeout(() => {
        getCountDown(10,true)      
      },900)
           setTimeout(() => {
         
        if (update < programmingQuestions.length) {
          currentQuizIndex = update;
          transitionOccurred = true;
          loadQuestions(currentQuizIndex);
       
          score.textContent = `0${update}`;
        } else{
          winGame()
        }
      }, 2000);
    }
  });
}

const finishedQuiz = document.querySelector(".finishedQuiz")
const againStartQuiz = document.querySelector(".againStartQuiz");


function winGame(){
  main.remove();
againStartQuiz.addEventListener("click", () => {
   location.reload();
})
}



let transitionOccurred = true;
let stepIndex = 0;

function quizContainerTransition(){
   if(transitionOccurred && stepIndex < steps.length){
       const check = document.createElement("i");
       check.className = "fa-solid fa-check  check";
       steps[stepIndex].textContent = "";
       steps[stepIndex].appendChild(check);
       steps[stepIndex].style.padding = "10px 12px"
        transitionOccurred =  !true 
        stepIndex++;


   }
 
    quizContainer.style.opacity = "0.7";
    quizContainer.style.cursor = "progress";
    options.forEach((option) => (option.style.cursor = "progress"));
    main.style.cursor = "progress";
    nextBtn.style.cursor = "progress";
  
    setTimeout(() => {
      quizContainer.style.opacity = "1";
      quizContainer.style.cursor = "";
      options.forEach((option) => {
        option.style.cursor = "pointer";
        option.style.backgroundColor = "";
      });
      main.style.cursor = "";
      nextBtn.style.cursor = "pointer";
      quizContainer.classList.add("inner");
      questions.classList.add("quizAnimate");
      options.forEach(option => {
        option.classList.add("optionAnimate")
      })
      setTimeout(() => {
      quizContainer.classList.remove("inner");
      questions.classList.remove("quizAnimate");
      options.forEach(option => {
        option.classList.remove("optionAnimate")
      })
      }, 1000);
    }, 1800);
  }
  
  

// so now we are going to add lobby features on this  quiz app ! 
// first of all we have to create a functions 
//and make it global that user can seen it at first time


const levelsBar = document.querySelector(".levelsBar");
const navbar = document.querySelector(".navbar");
const pointsBar = document.querySelector(".pointsBar");
const timer = document.querySelector(".timer");
const startGame = document.querySelector(".startGame");
const startGameContent = document.querySelector(".startGameContent");
const quizAppHeader = document.querySelector(".quizAppHeader");
const quizIntro = document.querySelector(".quizIntro"); 
const quitGame = document.querySelector(".quitGame");



function quizLobbyInterface(){
  startGame.addEventListener("click", () => {
    quizIntro.classList.add("quizAnimate");
    const quizAnimate = document.querySelector(".quizAnimate");
    quizAnimate.style.animation = "quizIntroAnimate ease 1s";
    setTimeout(() => {
      quizIntro.remove();
      quizAnimate.style.backgroundImage = "";
    },1000)
  setTimeout(() => {
      getCountDown(10);

  },10)
  });



quitGame.addEventListener("click", () => {
  main.remove();
  headLine.remove();
})
}
quizLobbyInterface();




let index = 0; // Declare index outside of the getCountDown function

let timeOccured = true;

let interval;

function getCountDown(countValue, timeStop) {
  clearInterval(interval); // Clear any existing interval
  let sec = countValue;
  interval = setInterval(startTimer, 1000);

  function startTimer() {
    countdown.textContent = sec + "s";
    sec--;

    if (countdown.textContent === "0s") {
      clearInterval(interval);
      tryPopUp();
      if (hearts.length > index) {
        updateHearts(index);
        index++;
      } else {
        gameOver();
      }
    }
  
  if(timeStop){
    nextBtn.addEventListener("click", () => {
      clearInterval(interval)
    })
  }

  }
}

function updateHearts(value) {
  let currentHearts = value;
  hearts[currentHearts].classList.remove("fa-heart-circle-plus");
  hearts[currentHearts].classList.add("fa-heart-crack");
  const crack = document.querySelectorAll(".fa-heart-crack");
  crack.forEach(craked => craked.style.color = "grey");
}


function gameOver(){
  const popUp = document.querySelector(".popUp");
popUp.style.display = "block";
let tryPra = document.querySelector(".tryPra");

tryPra.classList.add("gameover");
let gameOver = document.querySelector(".gameover");
gameOver.textContent = "you don't have enough hearts !";

const sadEmoji = document.querySelector(".sademoji");
sadEmoji.classList.add("defetedEmoji");
sadEmoji.classList.remove("sademoji");
const defetedEmoji = document.querySelector(".defetedEmoji");
defetedEmoji.setAttribute("src","broken hearts.png");

quizContainer.classList.add("innerBlur");
const innerBlur = document.querySelector(".innerBlur");
innerBlur.style.transition = "1s ease all";
innerBlur.style.filter = "blur(1.5px)";
 

options.forEach((button) => {
   button.style.pointerEvents = "none";
})
popUp.classList.add("popUpAnimate");

const tryBtn = document.querySelector(".tryBtn");
tryBtn.textContent = "restart Game";
   
tryBtn.addEventListener("click", function(){
  location.reload();
})
  
}



function tryPopUp(){
const popUp = document.querySelector(".popUp");
popUp.style.display = "block";
let tryPra = document.querySelector(".tryPra");

tryPra.textContent = "opps! time out 💔"

quizContainer.classList.add("innerBlur");
const innerBlur = document.querySelector(".innerBlur");
innerBlur.style.transition = "1s ease all";
innerBlur.style.filter = "blur(1.5px)";
 

options.forEach((button) => {
   button.style.pointerEvents = "none";
})
popUp.classList.add("popUpAnimate");

const tryBtn = document.querySelector(".tryBtn");
tryBtn.addEventListener("click", () => {
  setTimeout(() => {
     getCountDown(10);
  },1000) 
  popUp.style.display = "none";
  innerBlur.style.filter = "blur(0px)";
  options.forEach((button) => {
    button.style.pointerEvents = "auto";
 })
})
}









