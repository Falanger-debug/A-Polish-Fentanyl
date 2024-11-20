const translations = {
    en: null,
    pl: null
};

let currentLang = localStorage.getItem('lang') || 'en';

async function loadTranslations(lang) {
    if (!translations[lang]) {
        const response = await fetch(`../i18n/${lang}.json`);
        translations[lang] = await response.json();
    }
    return translations[lang];
}

async function changeLanguage(lang) {
    const i18n = await loadTranslations(lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[key]) {
            el.innerHTML = i18n[key];
        }

        if (el.hasAttribute('data-text')) {
            el.setAttribute('data-text', i18n[key]);
        }
    });

    const languageSwitch = document.querySelector('.language-switch span');
    if (languageSwitch) {
        languageSwitch.textContent = i18n.language;
    }

    localStorage.setItem('lang', lang);
    currentLang = lang;

    const path = window.location.pathname
    if (path.includes("quiz_1.html")){
        await loadQuestions();
        showQuestion();
    }

}


async function initI18n() {
    await changeLanguage(currentLang);

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
