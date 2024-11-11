document.addEventListener("DOMContentLoaded", () => {
    const scrollUpButton = document.getElementById('scrollUp');
    const scrollDownButton = document.getElementById('scrollDown');

    function scrollUp(){
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }

    function scrollDown(){
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }

    scrollUpButton.addEventListener('click', scrollUp);
    scrollDownButton.addEventListener('click', scrollDown);
})

