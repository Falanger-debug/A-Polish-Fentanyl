let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

document.addEventListener("DOMContentLoaded", async () => {
    await initI18n();
    await loadQuestions()
    showQuestion()
});

function loadQuestions() {
    let currentLang = localStorage.getItem('lang') || 'en';
    console.log(`Loading questions for language: ${currentLang}`);
    return fetch(`../i18n/${currentLang}_questions.json`)
        .then(response => response.json())
        .then(data => {
            questions = data;
        })
        .catch(error => console.error("Error loading questions:", error));
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');

    if (questionContainer) {
        if (questionContainer.classList.contains('fade-out')) {
            questionContainer.classList.remove('fade-out');
        }
        questionContainer.classList.add('fade-in');
    } else {
        console.error("Element 'question-container' not found");
        return;
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
    if (questionContainer) {
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

    const correctIndex = "ABCD".indexOf(currentQuestion.correctAnswer);
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
        score++;
    }

    showExplanation(isCorrect, currentQuestion.explanation);

}

function showExplanation(isCorrect, explanation) {
    const explanationContainer = document.getElementById("explanation-container");
    const explanationText = document.getElementById("explanation-text");

    if (currentLang === 'en') {
        explanationText.innerText = isCorrect ? "CORRECT!\n" + explanation : "INCORRECT!\n" + explanation;
    } else {
        explanationText.innerText = isCorrect ? "PRAWDA!\n" + explanation : "FAŁSZ!\n" + explanation;
    }


    explanationContainer.style.display = "block";
    explanationContainer.classList.remove("fade-out");
    explanationContainer.classList.add("fade-in");
}

function nextQuestion() {
    const explanationContainer = document.getElementById("explanation-container");

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
    if (currentLang === "en") {
        document.getElementById("score").innerText = `Your score: ${score} / ${questions.length}`;
    } else {
        document.getElementById("score").innerText = `Twój wynik: ${score} / ${questions.length}`;
    }
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").classList.remove("active");
    document.getElementById("question-container").classList.add("active");
    document.getElementById("question-container").style.display = "block";

    showQuestion();
}
