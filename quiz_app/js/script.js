const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "None"],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which is not a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare variable in JS?",
        options: ["var", "int", "string", "float"],
        answer: 0
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let userAnswers = [];

const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const reviewEl = document.getElementById("review");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    selectedOption = null;
    optionsEl.innerHTML = "";
    questionEl.textContent = questions[currentQuestion].question;

    questions[currentQuestion].options.forEach((option, index) => {
        const div = document.createElement("div");
        div.textContent = option;
        div.classList.add("option");
        div.addEventListener("click", () => selectOption(div, index));
        optionsEl.appendChild(div);
    });
}

function selectOption(element, index) {
    document.querySelectorAll(".option").forEach(opt =>
        opt.classList.remove("selected")
    );
    element.classList.add("selected");
    selectedOption = index;
}

function nextQuestion() {
    if (selectedOption === null) return;

    userAnswers.push(selectedOption);

    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${questions.length}`;

    showReview();
}

function showReview() {
    reviewEl.innerHTML = "";

    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("review-question");

        div.innerHTML = `<h4>Q${index + 1}. ${q.question}</h4>`;

        q.options.forEach((opt, i) => {
            const p = document.createElement("p");
            p.textContent = opt;

            if (i === q.answer) {
                p.classList.add("correct");
            }

            if (i === userAnswers[index] && i !== q.answer) {
                p.classList.add("wrong");
            }

            div.appendChild(p);
        });

        reviewEl.appendChild(div);
    });
}