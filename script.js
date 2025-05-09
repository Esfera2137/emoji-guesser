const emojiChallenges = [
  { emojis: "💰🔗", answer: "Bitcoin", explanation: "💰 money, 🔗 chain" },
  { emojis: "🌐🔒", answer: "Ethereum", explanation: "🌐 network, 🔒 security" }
  // ... reszta bazy
];

let currentChallenge = null;

function loadChallenge() {
  const randomIndex = Math.floor(Math.random() * emojiChallenges.length);
  currentChallenge = emojiChallenges[randomIndex];
  document.getElementById("emojis").textContent = currentChallenge.emojis;
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
  const correctAnswer = currentChallenge.answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    document.getElementById("result").textContent = `Correct! ${currentChallenge.explanation}`;
    document.querySelector('meta[name="fc:frame:image"]').setAttribute("content", "https://i.imgur.com/8WqYg5f.jpg");
  } else {
    document.getElementById("result").textContent = `Wrong! Try again. The answer was ${currentChallenge.answer}. ${currentChallenge.explanation}`;
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
