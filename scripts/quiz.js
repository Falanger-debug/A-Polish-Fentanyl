let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch("../questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error("Error loading questions:", error));
});

function showQuestion() {
    document.getElementById("result-container").classList.remove("active");
    document.getElementById("question-container").classList.add("active");

    const questionElement = document.getElementById("question");
    const choicesContainer = document.getElementById("choices");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.classList.add("choice-button");
        button.addEventListener("click", () => selectAnswer(index));
        choicesContainer.appendChild(button);
    });

    document.getElementById("next-button").style.display = "none";
    document.getElementById("explanation-container").style.display = "none";
    selectedAnswerIndex = null;
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const choiceButtons = document.querySelectorAll('.choice-button');

    choiceButtons.forEach(button => button.classList.remove("selected"));
    choiceButtons[selectedIndex].classList.add("selected");

    selectedAnswerIndex = selectedIndex;

    // Pokaż okienko z wyjaśnieniem zaraz po wyborze odpowiedzi
    const correctIndex = "ABCD".indexOf(currentQuestion.correctAnswer);
    const isCorrect = selectedIndex === correctIndex;

    // Wyświetlenie wyjaśnienia bez opóźnienia
    showExplanation(isCorrect, currentQuestion.explanation);

    // Ukrycie przycisku "Next Question" do czasu kliknięcia "Continue"
    document.getElementById("next-button").style.display = "none";
}

function showExplanation(isCorrect, explanation) {
    const explanationContainer = document.getElementById("explanation-container");
    const explanationText = document.getElementById("explanation-text");

    explanationText.innerText = isCorrect
        ? "Correct! " + explanation
        : "Incorrect. " + explanation;

    explanationContainer.style.display = "block"; // Upewniamy się, że element jest widoczny
    explanationContainer.classList.remove("fade-out");
    explanationContainer.classList.add("fade-in");
}

function hideExplanation() {
    const explanationContainer = document.getElementById("explanation-container");
    explanationContainer.classList.remove("fade-in");
    explanationContainer.classList.add("fade-out");

    setTimeout(() => {
        explanationContainer.style.display = "none";
        document.getElementById("next-button").style.display = "block";
    }, 500); // Czas zgodny z animacją
}


function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = "ABCD".indexOf(currentQuestion.correctAnswer);

    if (selectedAnswerIndex === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function continueToNextQuestion() {
    const explanationContainer = document.getElementById("explanation-container");
    explanationContainer.classList.remove("fade-in");
    explanationContainer.classList.add("fade-out");

    setTimeout(() => {
        explanationContainer.style.display = "none";
        document.getElementById("next-button").style.display = "block";
    }, 500); // Czas musi być zgodny z długością animacji
}


function showResult() {
    document.getElementById("question-container").classList.remove("active");
    document.getElementById("result-container").classList.add("active");
    document.getElementById("score").innerText = `${score} / ${questions.length}`;
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").classList.remove("active");
    document.getElementById("question-container").classList.add("active");
    showQuestion();
}
