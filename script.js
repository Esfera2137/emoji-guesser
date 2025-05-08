// Baza danych z emotikonami i odpowiedziami
// Uwaga: To nasza baza, którą możemy rozbudować
const emojiChallenges = [
    { emojis: "💰🔗", answer: "Bitcoin", explanation: "💰 symbolizes money, 🔗 a chain – it's Bitcoin." },
    { emojis: "🌐🔒👥", answer: "Ethereum", explanation: "🌐 is a network, 🔒 security, 👥 community – it's Ethereum." },
    { emojis: "🐕💸", answer: "Dogecoin", explanation: "🐕 is a dog, 💸 money – it's Dogecoin." },
    { emojis: "👨‍🚀📈", answer: "Vitalik Buterin", explanation: "👨‍🚀 is an innovator, 📈 growth – it's Vitalik Buterin." },
    { emojis: "🔄💻", answer: "DeFi", explanation: "🔄 symbolizes exchange, 💻 technology – it's DeFi." },
    { emojis: "🖼️🔢", answer: "NFT", explanation: "🖼️ is an image, 🔢 uniqueness – it's NFT." }
  ];
  
  // Zmienne
  let currentChallenge = null;
  
  // Funkcja losująca wyzwanie
  function loadChallenge() {
    // Losowy indeks z bazy
    const randomIndex = Math.floor(Math.random() * emojiChallenges.length);
    currentChallenge = emojiChallenges[randomIndex];
    document.getElementById("emojis").textContent = currentChallenge.emojis;
    document.getElementById("answer").value = ""; // Wyczyść pole
    document.getElementById("result").textContent = ""; // Wyczyść wynik
  }
  
  // Sprawdzanie odpowiedzi po kliknięciu przycisku "Check"
  function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = currentChallenge.answer.toLowerCase();
  
    if (userAnswer === correctAnswer) {
      document.getElementById("result").textContent = `Correct! ${currentChallenge.explanation}`;
    } else {
      document.getElementById("result").textContent = `Wrong! Try again. The answer was ${currentChallenge.answer}. ${currentChallenge.explanation}`;
    }
  }
  
  // Symulacja kliknięcia przycisku (Farcaster używa button:1)
  document.addEventListener("DOMContentLoaded", () => {
    loadChallenge(); // Załaduj pierwsze wyzwanie
    // Farcaster wywołuje checkAnswer, gdy użytkownik kliknie "Check" w Frame
    window.addEventListener("message", (event) => {
      if (event.data && event.data.buttonIndex === 1) {
        checkAnswer();
      }
    });
  });