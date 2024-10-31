document.addEventListener("DOMContentLoaded", function () {
    const choices = []
    const checkAnswerButton = document.getElementById("check-answer");
    const correctAnswer = "B";  // Zdefiniowana poprawna odpowiedź
    let selectedChoice = null;

    // Funkcja obsługująca wybór odpowiedzi
    choices.forEach(choice => {
        choice.addEventListener("click", function () {
            // Usuwamy zaznaczenie z innych odpowiedzi
            choices.forEach(c => c.classList.remove("selected"));
            // Dodajemy zaznaczenie do aktualnej odpowiedzi
            choice.classList.add("selected");
            // Przechowujemy wybraną odpowiedź
            selectedChoice = choice.getAttribute("data-choice");
        });
    });

    // Funkcja obsługująca przycisk "Check Answer"
    checkAnswerButton.addEventListener("click", function () {
        if (selectedChoice) {
            if (selectedChoice === correctAnswer) {
                alert("Correct answer!");
            } else {
                alert("Wrong answer. Try again!");
            }
        } else {
            alert("Please select an answer.");
        }
    });
});
