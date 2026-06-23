function handleHeader() {
  const headerDropdown = document.querySelector("#header-nav");
  const headerMenuBtn = document.querySelector("#header-menu-btn");
  headerMenuBtn.addEventListener("click", () => {
    const isExpanded = headerMenuBtn.getAttribute("aria-expanded") === "true";
    headerMenuBtn.setAttribute("aria-expanded", !isExpanded);
    headerDropdown.inert = isExpanded;
    headerDropdown.classList.toggle("header__nav--expanded");
  });
}

handleHeader();
