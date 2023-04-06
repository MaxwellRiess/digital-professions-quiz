document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
  {
    question: "Which of the following activities do you enjoy the most?",
    answers: [
      { text: "Solving puzzles", label: "A", score: 1 },
      { text: "Drawing or designing", label: "B", score: 1 },
      { text: "Writing stories or articles", label: "C", score: 1 },
      { text: "Analyzing data or trends", label: "D", score: 1 },
      { text: "Playing video games", label: "E", score: 1 },
    ],
  },

  {
    question: "If you were stranded on a desert island, how would you help the group survive??",
    answers: [
      { text: "Look for food", label: "A", score: 1 },
      { text: "Build a stable shelter", label: "B", score: 1 },
      { text: "Keep everyones marale up", label: "C", score: 1 },
      { text: "Help eveyone work together", label: "D", score: 1 },
      { text: "Go it alone", label: "E", score: 1 },
      { text: "Pet skills", label: "E", score: 1 },
    ],
  },

  {
    question: "What motivates you the most in your work?",
    answers: [
      { text: "Personal achievement and growth", label: "A", score: 1 },
      { text: "Making a difference in the world", label: "B", score: 1 },
      { text: "Financial rewards and stability", label: "C", score: 1 },
      { text: "Recognition and praise from others", label: "D", score: 1 },
      { text: "Destroying my enemies", label: "E", score: 5 },
    ],
  },
  // Add more questions and answers here

];

  const resultDescriptions = {
  A: "You would excel as a Web Developer. You have a knack for coding and enjoy creating beautiful and functional websites.",
  B: "You're a natural fit for a career in Data Science. Your analytical and problem-solving skills would shine in this field.",
  C: "A career as a UX/UI Designer would suit you well. You have a great eye for design and user experiences.",
  D: "You would thrive in the world of Cybersecurity. Your attention to detail and passion for keeping data secure make you an ideal candidate.",
  E: "A role in Project Management would be perfect for you. Your ability to plan, organize, and lead teams is valuable in the digital sector.",
};

  let currentQuestion = 0;
  let selectedAnswers = [];

  const userScores = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };

  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById('result-container');
  const resultTitle = document.getElementById('result-title');
  const resultDescription = document.getElementById('result-description');
  const restartButton = document.getElementById('restart-button');

  function changeQuestion(direction) {
    currentQuestion += direction;
    loadQuiz();
  }

  function loadQuiz() {
    const questionData = quizData[currentQuestion];
    quizContainer.innerHTML = `
  <fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h2 class="govuk-fieldset__heading">${questionData.question}</h2>
    </legend>
    <div class="govuk-form-group">
      <div class="answer-button-container">
        ${questionData.answers
          .map(
            (answer, i) => `
          <button class="govuk-button govuk-button--secondary answer-button" data-label="${answer.label}" data-score="${answer.score}">
            ${answer.text}
          </button>`
          )
          .join("")}
      </div>
    </div>
  </fieldset>`;


   
    const answerButtons = document.querySelectorAll(".answer-button");
    answerButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
      const label = event.target.getAttribute("data-label");
      const score = parseInt(event.target.getAttribute("data-score"), 10);
      userScores[label] += score;

    // Add the 'clicked' class and remove it after 0.5 seconds
    event.target.classList.add("clicked");
    setTimeout(() => {
      event.target.classList.remove("clicked");
    }, 500);

    // Apply fade-out animations to question and answer buttons
    const questionElement = quizContainer.querySelector(".govuk-fieldset__heading");
    questionElement.classList.add("fade-out");
    answerButtons.forEach((btn) => btn.classList.add("fade-out"));

    // Apply slower fade-out to the clicked button
    event.target.classList.add("fade-out-slow");

    // Change the question after the animations are complete (1 second)
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        changeQuestion(1);
      } else {
        showResult();
      }

      // Remove fade-out classes
      questionElement.classList.remove("fade-out");
      answerButtons.forEach((btn) => {
        btn.classList.remove("fade-out");
        btn.classList.remove("fade-out-slow");
      });
    }, 1000);
  });
});

  }

  function showResult() {
    const highestScore = Math.max(...Object.values(userScores));
    const resultLabel = Object.keys(userScores).find((key) => userScores[key] === highestScore);
    const resultDescription = resultDescriptions[resultLabel];

    quizContainer.classList.add("hidden");
    const resultDiv = document.getElementById("result-container");
    resultDiv.innerHTML = `
      <h2 class="govuk-heading-l">Your Result: ${resultLabel}</h2>
      <p class="govuk-body">${resultDescription}</p>
      <button class="govuk-button" id="restart-button">Restart Quiz</button>
    `;
    resultDiv.classList.remove("hidden");

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
      currentQuestion = 0;
      userScores.A = 0;
      userScores.B = 0;
      userScores.C = 0;
      userScores.D = 0;
      userScores.E = 0;
      resultDiv.classList.add("hidden");
      quizContainer.classList.remove("hidden");
      loadQuiz();
    });
  }

  loadQuiz();
});
