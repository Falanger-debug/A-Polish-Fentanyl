document.addEventListener("DOMContentLoaded", () => {
    const footerHTML = `
        <div class="footer">
            <p>&copy; 2024 Sober Choice. All rights reserved.</p>
            <div class="footer-socials">
                <a href="https://facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://twitter.com" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
