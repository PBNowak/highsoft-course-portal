document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".student-nav-dropdown");
    const toggle = document.querySelector(".student-nav-toggle");
    const menu = document.querySelector(".student-nav-menu");

    if (!dropdown || !toggle || !menu) return;

    function closeMenu() {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        menu.hidden = isOpen;
        toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            toggle.focus();
        }
    });
});