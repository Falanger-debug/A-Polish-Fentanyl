document.addEventListener("DOMContentLoaded", function () {
    const numberElement = document.getElementById("number");
    const questionElement = document.getElementById("question");
    const choicesContainer = document.getElementById("choices-container");
    const checkAnswerButton = document.getElementById("check-answer");
    let currentQuestionIndex = 0;
    let questions = [];
    let selectedChoice = null;

    // Funkcja do ładowania pytań z pliku JSON
    fetch("../questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error("Error loading questions:", error));

    // Funkcja do wyświetlania pytania
    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            alert("Quiz completed!");
            return;
        }

        const questionData = questions[currentQuestionIndex];
        questionElement.textContent = questionData.question;
        choicesContainer.innerHTML = "";

        // Wyświetl odpowiedzi
        questionData.choices.forEach((choice, index) => {
            const choiceContainer = document.createElement("div");
            choiceContainer.classList.add("choice-container");
            choiceContainer.setAttribute("data-choice", String.fromCharCode(65 + index)); // A, B, C, D

            const choicePrefix = document.createElement("p");
            choicePrefix.classList.add("choice-prefix");
            choicePrefix.textContent = String.fromCharCode(65 + index); // A, B, C, D

            const choiceText = document.createElement("p");
            choiceText.classList.add("choice-text");
            choiceText.textContent = choice;

            choiceContainer.appendChild(choicePrefix);
            choiceContainer.appendChild(choiceText);
            choicesContainer.appendChild(choiceContainer);

            // Obsługa wyboru odpowiedzi
            choiceContainer.addEventListener("click", function () {
                // Resetowanie zaznaczenia odpowiedzi
                document.querySelectorAll(".choice-container").forEach(c => c.classList.remove("selected"));
                choiceContainer.classList.add("selected");
                selectedChoice = choiceContainer.getAttribute("data-choice");
            });
        });
    }

    // Funkcja obsługująca przycisk "Check Answer"
    checkAnswerButton.addEventListener("click", function () {
        if (selectedChoice) {
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
            if (selectedChoice === correctAnswer) {
                alert("Correct answer!");
            } else {
                alert("Wrong answer. Try again!");
            }
            // Przejdź do następnego pytania
            currentQuestionIndex++;
            selectedChoice = null;
            displayQuestion();
        } else {
            alert("Please select an answer.");
        }
    });
});
