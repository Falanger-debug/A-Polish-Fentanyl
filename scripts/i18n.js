const translations = {
    en: null,
    pl: null
};

let currentLang = localStorage.getItem('lang') || 'en';

// Funkcja do ładowania tłumaczeń z plików JSON
async function loadTranslations(lang) {
    if (!translations[lang]) {
        const response = await fetch(`../i18n/${lang}.json`);
        translations[lang] = await response.json();
    }
    return translations[lang];
}

// Funkcja do zmiany języka
async function changeLanguage(lang) {
    const i18n = await loadTranslations(lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[key]) {
            el.innerHTML = i18n[key];
        }
    });

    // Aktualizacja tekstu przycisku zmiany języka
    const languageSwitch = document.querySelector('.language-switch span');
    if (languageSwitch) {
        languageSwitch.textContent = i18n.language;
    }

    // Zapisanie preferencji w localStorage
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

// Inicjalizacja języka
async function initI18n() {
    await changeLanguage(currentLang);

    // Obsługa zmiany języka po kliknięciu
    const languageSwitch = document.querySelector('.language-switch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'pl' : 'en';
            changeLanguage(newLang);
        });
    } else {
        console.error('Element .language-switch not found');
    }
}
