const emojiChallenges = [
  { emojis: "💰🔗", answer: "Bitcoin", explanation: "💰 money, 🔗 chain" },
  { emojis: "🌐🔒", answer: "Ethereum", explanation: "🌐 network, 🔒 security" }
  // ... reszta bazy
];

let currentChallenge = null;

function loadChallenge() {
  console.log('loadChallenge() wywołana');
  const emojisElement = document.getElementById("emojis");
  const answerInput = document.getElementById("answer");
  const resultElement = document.getElementById("result");

  console.log('emojisElement:', emojisElement);
  console.log('answerInput:', answerInput);
  console.log('resultElement:', resultElement);

  const randomIndex = Math.floor(Math.random() * emojiChallenges.length);
  currentChallenge = emojiChallenges[randomIndex];

  if (emojisElement) {
    emojisElement.textContent = currentChallenge.emojis;
  } else {
    console.error('Element o id "emojis" nie został znaleziony!');
  }

  if (answerInput) {
    answerInput.value = "";
  } else {
    console.error('Element o id "answer" nie został znaleziony!');
  }

  if (resultElement) {
    resultElement.textContent = "";
  } else {
    console.error('Element o id "result" nie został znaleziony!');
  }
  console.log('loadChallenge() zakończona');
}

function checkAnswer() {
  const answerInput = document.getElementById("answer");
  const resultElement = document.getElementById("result");
  const userAnswer = answerInput ? answerInput.value.trim().toLowerCase() : "";
  const correctAnswer = currentChallenge.answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    if (resultElement) {
      resultElement.textContent = `Correct! ${currentChallenge.explanation}`;
    }
    document.querySelector('meta[name="fc:frame:image"]').setAttribute("content", "https://i.imgur.com/8WqYg5f.jpg");
  } else {
    if (resultElement) {
      resultElement.textContent = `Wrong! Try again. The answer was ${currentChallenge.answer}. ${currentChallenge.explanation}`;
    }
    document.querySelector('meta[name="fc:frame:image"]').setAttribute("content", "https://i.imgur.com/8WqYg5f.jpg");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, calling loadChallenge");
  loadChallenge();
  // Wyślij action.ready, gdy strona jest gotowa
  window.parent.postMessage({ action: "ready" }, "*");
  console.log("Sent action.ready to parent");

  window.addEventListener("message", (event) => {
    console.log("Received message from Farcaster:", event.data);
    if (event.data && event.data.buttonIndex === 1) {
      checkAnswer();
    }
  });
});
