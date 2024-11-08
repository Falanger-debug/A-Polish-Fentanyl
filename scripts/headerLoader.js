document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../header/header.html');
        const headerContent = await response.text();
        document.getElementById('header').innerHTML = headerContent;

        // Dopiero po załadowaniu nagłówka, możemy uruchomić i18n.js
        initI18n();
    } catch (error) {
        console.error('Error loading header:', error);
    }
});
