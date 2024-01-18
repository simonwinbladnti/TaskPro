let selectBurger = document.querySelector(".burger-icon");
let menuActive = false;

function showMenu() {
    let menu = document.querySelector("nav");
    if (!menuActive) {
        menu.classList.add("show");
        menuActive = true;
    } else {
        menu.classList.remove("show");
        menuActive = false;
    }
}

selectBurger.addEventListener('click', showMenu);
