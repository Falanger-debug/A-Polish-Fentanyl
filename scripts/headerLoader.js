document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../header/header.html');
        document.getElementById('header').innerHTML = await response.text();

        await initI18n();
    } catch (error) {
        console.error('Error loading header:', error);
    }
});
