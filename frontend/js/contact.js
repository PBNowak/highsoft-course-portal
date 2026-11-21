
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-feedback");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Demo form: no message is sent to a server
        feedback.textContent =
            "Demo only: Your message was not sent. Contact functionality is not connected yet.";

        form.reset();
    });
});
