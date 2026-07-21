import { questions } from "./data/questions.js";
const isDesktop = window.matchMedia("(width >= 992px)");
// #region header
const headerDropdown = document.querySelector("#header-nav");
const headerMenuBtn = document.querySelector("#header-menu-btn");
let isOpen = false;
headerMenuBtn.addEventListener("click", () => handleClick(isOpen));
const handleClick = (state) => {
  isOpen = !state;

  headerMenuBtn.setAttribute("aria-expanded", !state);
  headerDropdown.inert = state;
  // headerDropdown.classList.toggle("header__nav--expanded");
  if (!state) {
    headerDropdown.classList.add("header__nav--expanded");
  } else {
    headerDropdown.classList.remove("header__nav--expanded");
  }
};
const closeNav = (state) => {
  isOpen = !state;
  headerMenuBtn.setAttribute("aria-expanded", !state);
  headerDropdown.inert = !state;

  if (!state) {
    headerDropdown.classList.add("header__nav--expanded");
  } else {
    headerDropdown.classList.remove("header__nav--expanded");
  }
};
const handleLoad = () => {
  if (isDesktop.matches) {
    headerDropdown.inert = false;
  } else {
  }
};
const handleChange = () => {
  if (isDesktop.matches) {
    closeNav(true);
  } else {
    headerDropdown.inert = true;
  }
};
window.addEventListener("DOMContentLoaded", handleLoad);
isDesktop.addEventListener("change", handleChange);
// #endregion header

// #region quiz-active
const easyQuiz = document.querySelector("#quiz-card-green");
const mediumQuiz = document.querySelector("#quiz-card-blue");
const hardQuiz = document.querySelector("#quiz-card-yellow");
const masterQuiz = document.querySelector("#quiz-card-pink");
const quizContainerActive = document.querySelector("#quiz-container-active");
const quizContainerResults = document.querySelector("#quiz-container-results");
const resetBtn = document.querySelector("#reset-button");
easyQuiz.addEventListener("click", () => {
  quizStart("easy");
});
mediumQuiz.addEventListener("click", () => {
  quizStart("medium");
});
hardQuiz.addEventListener("click", () => {
  quizStart("hard");
});
masterQuiz.addEventListener("click", () => {
  quizStart("master");
});
resetBtn.addEventListener("click", () => {
  toggleHidden();
});
function quizStart(type) {
  const currentQuestion = document.querySelector("#current-quiz-question");
  const answerA = document.querySelector("#answer-a");
  const answerB = document.querySelector("#answer-b");
  const answerC = document.querySelector("#answer-c");
  const answerD = document.querySelector("#answer-d");

  if (type === "easy") {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    const remaining = [...randomQuestion.options];

    const optionA = remaining.splice(
      Math.floor(Math.random() * remaining.length),
      1,
    )[0];

    const optionB = remaining.splice(
      Math.floor(Math.random() * remaining.length),
      1,
    )[0];

    const optionC = remaining.splice(
      Math.floor(Math.random() * remaining.length),
      1,
    )[0];

    const optionD = remaining.splice(
      Math.floor(Math.random() * remaining.length),
      1,
    )[0];

    answerA.innerHTML = optionA;
    answerB.innerHTML = optionB;
    answerC.innerHTML = optionC;
    answerD.innerHTML = optionD;
    currentQuestion.innerHTML = randomQuestion.question;
    console.log(randomQuestion.options);
    console.log(optionA);
    console.log(optionC);
    console.log(`${randomQuestion.correct} is correct!`);

    // log options
    // log a random option
    // log the new list of options without previous one

    // you know the value of the item you need to remove and the index of the item

    // find random item in array
    // remove item from array
    // // HOW DO U REMOVE AN ITEM FROM AN ARRAY?
    // find another random item

    console.log("you chose easy");
  } else if (type === "medium") {
    console.log("you chose medium");
  } else if (type === "hard") {
    console.log("you chose hard");
  } else if (type === "master") {
    console.log("You chose master");
  } else {
    console.log("error::quiz not found");
  }

  toggleHidden();
}

function quizResults() {
  quizContainerResults.classList.toggle("hidden");
}
function toggleHidden() {
  const quizHero = document.querySelector("#quiz-hero");
  quizHero.classList.toggle("hidden");
  easyQuiz.classList.toggle("hidden");
  mediumQuiz.classList.toggle("hidden");
  hardQuiz.classList.toggle("hidden");
  masterQuiz.classList.toggle("hidden");
  quizContainerActive.classList.toggle("hidden");
  resetBtn.classList.toggle("hidden");
}

// const answerTrue = document.querySelector("#answer-true");
// const answerFalse = document.querySelector("#answer-false");
// answerTrue.addEventListener("click", () => {
//   console.log("true");
// });
// answerFalse.addEventListener("click", () => {
//   console.log("false");
// });

// #endregion quiz-active

// create if statement to determine which card has been clicked,
// since each will run quizStart and quizResults.
// statement should
