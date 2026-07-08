const isDesktop = window.matchMedia("(width >= 992px)");

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

// function handleHeader() {
const closeNav = (state) => {
  // headerMenuBtn.focus();
  isOpen = !state;

  headerMenuBtn.setAttribute("aria-expanded", !state);
  headerDropdown.inert = !state;
  // headerDropdown.classList.toggle("header__nav--expanded");
  if (!state) {
    headerDropdown.classList.add("header__nav--expanded");
  } else {
    headerDropdown.classList.remove("header__nav--expanded");
  }
};
// }

// handleHeader();

// source of truth for styles
// read screen size on start and resize to handle inert and aria-expanded

const handleLoad = () => {
  if (isDesktop.matches) {
    headerDropdown.inert = false;

    // console.log(true);
  } else {
    // console.log(false);
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
