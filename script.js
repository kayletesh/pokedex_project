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

easyQuiz.addEventListener("click", () => {
  console.log("green");
});
mediumQuiz.addEventListener("click", () => {
  console.log("blue");
});
hardQuiz.addEventListener("click", () => {
  console.log("yellow");
});
masterQuiz.addEventListener("click", () => {
  console.log("pink");
});
// #endregion quiz-active
