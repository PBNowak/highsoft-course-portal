document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".student-nav-dropdown");
    const toggle = document.querySelector(".student-nav-toggle");
    const menu = document.querySelector(".student-nav-menu");

    if (!dropdown || !toggle || !menu) return;

        // --- Demo login ---
    // There is no real login system. localStorage remembers if the demo
    // user has logged out, so it stays that way when you change page.
    const userName = document.querySelector(".demo-user-name");
    const logoutLink = document.querySelector(".demo-logout");

    if (userName && logoutLink) {
        const loggedOut = localStorage.getItem("demoLoggedOut") === "true";

        if (loggedOut) {
            userName.textContent = "Log in";
            logoutLink.textContent = "Log in as Kari (demo)";
            
            // Logged out: no profile to show, so remove the link from the menu
            const profileLink = menu.querySelector('a[href="profile.html"]');
            if (profileLink) profileLink.remove();
        }

        // Clicking flips the staste: logged in → out, logged out → in
        logoutLink.addEventListener("click", () => {
            localStorage.setItem("demoLoggedOut", String(!loggedOut));
        });
    }

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