document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
  {
    question: "If you were stranded on a desert island, how would you help the group survive??",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "Let's play a classic game, what are we playing?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "You need to learn something about something new, where to you go first ",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "You wake up tomorrow with a new superpower. What is it?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "I place a large shiny black box on the table, it is making a faint ticking sound and shaking slightly, what do you do?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "Which famous innovator do you admire the most?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "If you were to start a club at school, what would it be about?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },

  {
    question: "Which cartoon character do you relate to the most?",
    answers: [
      { text: "A", label: "Developer", score: 1 },
      { text: "B", label: "Designer", score: 1 },
      { text: "C", label: "DeliveryManager", score: 1 },
      { text: "D", label: "ProductManager", score: 1 },
      { text: "E", label: "PerformanceAnalyst", score: 1 },
    ],
  },
  // Add more questions and answers here

];

  const resultDescriptions = {
  Developer: "You would excel as a Web Developer. You have a knack for coding and enjoy creating beautiful and functional websites.",
  DeliveryManager: "You would be a great delivery manager, your stong organisation and ability to motivate others make you perfect for a role that all about teamwork",
  Designer: "A career as a UX/UI Designer would suit you well. You have a great eye for design and user experiences.",
  UserResearcher: "You'd be a great User Researcher! You are great at searching for answer to the most important questions and spreading empathy throughout the team",
  ProductManager: "A role in Project Management would be perfect for you. Your ability to plan, organize, and lead teams is valuable in the digital sector.",
  PerformanceAnalyst: "Your analytical and problem-solving skills would shine in this field.",
};

  let currentQuestion = 0;
  let selectedAnswers = [];

  const userScores = {
    Developer: 0,
    DeliveryManager: 0,
    Designer: 0,
    UserResearcher: 0,
    ProductManager: 0,
    PerformanceAnalyst: 0,
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
      userScores.Developer = 0;
      userScores.DeliveryManager = 0;
      userScores.Designer = 0;
      userScores.UserResearcher = 0;
      userScores.ProductManager = 0;
      userScores.PerformanceAnalyst = 0;
      resultDiv.classList.add("hidden");
      quizContainer.classList.remove("hidden");
      loadQuiz();
    });
  }

  loadQuiz();
});
