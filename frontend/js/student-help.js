
document.addEventListener("DOMContentLoaded", () => {
    // Create the floating help button
    const helpButton = document.createElement("button");

    helpButton.type = "button";
    helpButton.className = "student-help-button";
    helpButton.textContent = "Need help?";
    helpButton.setAttribute("aria-label", "Open student help");

    // Add the button to the page
    document.body.appendChild(helpButton);

    // Create the FAQ panel
    const helpPanel = document.createElement("section");
    helpPanel.className = "student-help-panel";
    helpPanel.id = "student-help-panel";
    helpPanel.hidden = true;

    helpPanel.innerHTML = `
        <h2>How can we help?</h2>
        <p>Find answers to common questions below.</p>

        <h3>How do I start a course?</h3>
        <p>Choose a course, open its details, and click Start course.</p>

        <h3>Where can I see my progress?</h3>
        <p>Open My profile from the student menu to view your progress.</p>

        <h3>Can I continue a course later?</h3>
        <p>Yes! Your completed lessons are saved when progress tracking is enabled.</p>

        <a href="contact.html">Still need help? Contact us</a>
    `;

    document.body.appendChild(helpPanel);

    // Connect the button to the FAQ panel
    helpButton.setAttribute("aria-expanded", "false");
    helpButton.setAttribute("aria-controls", "student-help-panel");

    helpButton.addEventListener("click", () => {
        const isOpen = !helpPanel.hidden;

        helpPanel.hidden = isOpen;
        helpButton.setAttribute("aria-expanded", String(!isOpen));
    });

    // Close the FAQ panel when Escape is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !helpPanel.hidden) {
            helpPanel.hidden = true;
            helpButton.setAttribute("aria-expanded", "false");
            helpButton.focus();
        }
    });


});
