function handleHeader() {
  const headerDropdown = document.querySelector("#header-nav");
  const headerMenuBtn = document.querySelector("#header-menu-btn");
  console.log("hello world");
  headerMenuBtn.addEventListener("click", () => {
    headerDropdown.classList.toggle("header__nav--height");
    console.log("ITS WORKING");
  });
}

handleHeader();
