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
    const questionContainer = document.getElementById('question-container');

    if (questionContainer) {
        if (questionContainer.classList.contains('fade-out')) {
            questionContainer.classList.remove('fade-out');
        }
        questionContainer.classList.add('fade-in');
    } else {
        console.error("Element 'question-container' not found");
        return; // Wychodzimy z funkcji, jeśli nie znaleziono elementu
    }

    document.getElementById("result-container").classList.remove("active");
    questionContainer.classList.add("active");

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

    document.getElementById("explanation-container").style.display = "none";
    selectedAnswerIndex = null;
}

function hideQuestion() {
    const questionContainer = document.getElementById('question-container');
    if(questionContainer){
        questionContainer.classList.remove('fade-out');
        questionContainer.classList.remove('fade-in');
        questionContainer.style.display = "none";
    }
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

    if (isCorrect) {
        score ++;
    }

    showExplanation(isCorrect, currentQuestion.explanation);

}

function showExplanation(isCorrect, explanation) {
    const explanationContainer = document.getElementById("explanation-container");
    const explanationText = document.getElementById("explanation-text");

    explanationText.innerText = isCorrect
        ? "CORRECT!\n" + explanation
        : "INCORRECT!\n" + explanation;

    explanationContainer.style.display = "block"; // Upewniamy się, że element jest widoczny
    explanationContainer.classList.remove("fade-out");
    explanationContainer.classList.add("fade-in");
}

function nextQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    const explanationContainer = document.getElementById("explanation-container");

    // questionContainer.classList.remove("fade-in");
    // questionContainer.classList.add("face-out");

    explanationContainer.classList.remove("fade-in");
    explanationContainer.classList.add("fade-out");

    setTimeout(() => {
        explanationContainer.style.display = "none";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            hideQuestion();
            showResult();
        }
    }, 500);


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
    document.getElementById("question-container").style.display = "block";

    showQuestion();
}
